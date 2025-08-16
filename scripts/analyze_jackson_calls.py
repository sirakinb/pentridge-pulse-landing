import csv
import os
from datetime import datetime
from collections import Counter, defaultdict


INPUT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Case Studies', 'jackson_calls.csv'))
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Case Studies', 'JacksonMentalHomes'))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'jackson-calls-analysis.md')


BUSINESS_HOURS_START = 9  # 09:00 local
BUSINESS_HOURS_END = 17   # 17:00 local (5 PM)


def parse_bool(value: str):
    if value is None:
        return None
    v = str(value).strip().lower()
    if v in {'yes', 'y', 'true', '1'}:
        return True
    if v in {'no', 'n', 'false', '0'}:
        return False
    return None


def categorize_intent(text: str) -> str:
    if not text:
        return 'General Inquiry'
    t = text.lower()

    # Leasing-intent keywords
    if any(k in t for k in ['open house', 'open houses', 'tour', 'viewing', 'showing', 'walkthrough']):
        return 'Open Houses / Tours'
    if any(k in t for k in ['available', 'availability', 'vacancy', 'vacancies', 'available rentals', 'available properties']):
        return 'Availability / Listings'
    if any(k in t for k in ['apply', 'application', 'tenant turner', 'tenantturner']):
        return 'Apply / Application Status'
    if any(k in t for k in ['program', 'programs', 'voucher', 'section 8', 'hud', 'subsid']):
        return 'Programs / Vouchers'

    # Non-leasing/support intents
    if any(k in t for k in ['maintenance', 'repair', 'work order', 'fix', 'leak', 'toilet', 'broken']):
        return 'Maintenance'
    if any(k in t for k in ['payment', 'pay rent', 'balance', 'late fee', 'rent due']):
        return 'Payments / Balance'
    if any(k in t for k in ['returning', 'return call', 'called me back', 'missed call', 'transfer', 'speak to', 'looking for']):
        return 'Returning Call / Staff'
    if any(k in t for k in ['wrong number', 'spam', 'scam', 'telemarketer']):
        return 'Wrong Number / Spam'

    return 'General Inquiry'


def is_after_hours(dt: datetime) -> bool:
    # Weekend considered after-hours
    if dt.weekday() >= 5:
        return True
    # Outside 9-17 local considered after-hours
    return not (BUSINESS_HOURS_START <= dt.hour < BUSINESS_HOURS_END)


def load_rows(path: str):
    rows = []
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)
    return rows


def analyze(rows):
    total_calls = len(rows)

    # Parse and augment rows
    first_dt = None
    last_dt = None

    for r in rows:
        # Combine text fields for intent classification
        text = ' '.join([
            (r.get('Call Summary') or ''),
            (r.get('Transcript') or ''),
        ])
        r['intent'] = categorize_intent(text)

        # Parse datetime
        dt = None
        created = r.get('Created Time') or r.get('CreatedTime')
        if created:
            try:
                # Expecting format like: 2025-07-02 13:36:44
                dt = datetime.strptime(created.strip(), '%Y-%m-%d %H:%M:%S')
            except Exception:
                dt = None
        r['created_dt'] = dt
        r['after_hours'] = is_after_hours(dt) if dt else None

        if dt:
            if not first_dt or dt < first_dt:
                first_dt = dt
            if not last_dt or dt > last_dt:
                last_dt = dt

        r['callback_required'] = parse_bool(r.get('Call Back Required?'))
        r['could_ai_answer'] = parse_bool(r.get('Could this call have been answered by AI?'))

    # Time window in weeks
    if first_dt and last_dt:
        days = (last_dt - first_dt).days + 1
        weeks = max(1.0, days / 7.0)
    else:
        weeks = 1.0

    # Aggregates
    intents_counter = Counter(r['intent'] for r in rows)
    callback_counter = Counter('Yes' if r['callback_required'] else ('No' if r['callback_required'] is False else 'Unknown') for r in rows)
    ai_answerable_counter = Counter('Yes' if r['could_ai_answer'] else ('No' if r['could_ai_answer'] is False else 'Unknown') for r in rows)

    after_hours_total = sum(1 for r in rows if r['after_hours'] is True)

    # Define leasing-intent categories considered potential new leases
    leasing_intents = {
        'Open Houses / Tours',
        'Availability / Listings',
        'Apply / Application Status',
        'Programs / Vouchers',
    }
    qualified_leads = [r for r in rows if r['intent'] in leasing_intents]
    qualified_leads_count = len(qualified_leads)

    qualified_after_hours = [r for r in qualified_leads if r['after_hours'] is True]
    qualified_after_hours_count = len(qualified_after_hours)

    qualified_per_week = qualified_leads_count / weeks
    after_hours_per_week = qualified_after_hours_count / weeks

    # Conversion scenarios (lead -> signed lease)
    # Conservative to aggressive
    conv_scenarios = [0.05, 0.10, 0.15]

    # Revenue model inputs
    avg_monthly_rent = 1200.0
    mgmt_fee = 0.10
    months = 12
    revenue_per_lease_year = avg_monthly_rent * mgmt_fee * months  # $1,200 * 10% * 12 = $1,440

    estimates = []
    for conv in conv_scenarios:
        add_leases_per_week = after_hours_per_week * conv
        annual_leases = add_leases_per_week * 52
        annual_revenue = annual_leases * revenue_per_lease_year
        estimates.append({
            'conversion_rate': conv,
            'additional_leases_per_week': add_leases_per_week,
            'additional_leases_per_year': annual_leases,
            'annual_revenue_usd': annual_revenue,
            'revenue_per_lease_year': revenue_per_lease_year,
        })

    return {
        'total_calls': total_calls,
        'timeframe_weeks': weeks,
        'first_dt': first_dt,
        'last_dt': last_dt,
        'intents_counter': intents_counter,
        'callback_counter': callback_counter,
        'ai_answerable_counter': ai_answerable_counter,
        'after_hours_total': after_hours_total,
        'qualified_leads_count': qualified_leads_count,
        'qualified_after_hours_count': qualified_after_hours_count,
        'qualified_per_week': qualified_per_week,
        'after_hours_per_week': after_hours_per_week,
        'estimates': estimates,
        'revenue_per_lease_year': revenue_per_lease_year,
    }


def format_number(n, digits=2):
    try:
        return f"{n:,.{digits}f}"
    except Exception:
        return str(n)


def write_markdown(stats):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write('# Jackson Rental Homes — AI Voice Agent Call Analysis\n\n')
        if stats['first_dt'] and stats['last_dt']:
            f.write(f"Timeframe: {stats['first_dt'].date()} to {stats['last_dt'].date()} (~{format_number(stats['timeframe_weeks'])} weeks)\n\n")
        f.write(f"Total calls analyzed: {stats['total_calls']:,}\n\n")

        f.write('## AI Resolution & Callback\n')
        for key, val in stats['callback_counter'].items():
            pct = (val / stats['total_calls'] * 100.0) if stats['total_calls'] else 0.0
            f.write(f"- Callback required = {key}: {val:,} ({format_number(pct)}%)\n")
        f.write('\n')
        for key, val in stats['ai_answerable_counter'].items():
            pct = (val / stats['total_calls'] * 100.0) if stats['total_calls'] else 0.0
            f.write(f"- Could be answered by AI = {key}: {val:,} ({format_number(pct)}%)\n")
        f.write('\n')

        f.write('## Intent Breakdown\n')
        for intent, count in stats['intents_counter'].most_common():
            pct = (count / stats['total_calls'] * 100.0) if stats['total_calls'] else 0.0
            f.write(f"- {intent}: {count:,} ({format_number(pct)}%)\n")
        f.write('\n')

        f.write('## After-Hours Impact\n')
        pct_ah = (stats['after_hours_total'] / stats['total_calls'] * 100.0) if stats['total_calls'] else 0.0
        f.write(f"After-hours calls: {stats['after_hours_total']:,} ({format_number(pct_ah)}% of all calls)\n\n")
        f.write(f"Qualified leasing-intent leads: {stats['qualified_leads_count']:,} (~{format_number(stats['qualified_per_week'])}/week)\n\n")
        f.write(f"Qualified after-hours leads: {stats['qualified_after_hours_count']:,} (~{format_number(stats['after_hours_per_week'])}/week)\n\n")

        f.write('## Additional Leases & Revenue (Scenarios)\n')
        f.write(f"Assumptions: avg monthly rent = $1,200, management fee = 10%, lease term = 12 months → revenue per lease/year = ${format_number(stats['revenue_per_lease_year'], 0)}.\n\n")
        for e in stats['estimates']:
            f.write(f"- Conversion {int(e['conversion_rate']*100)}% → +{format_number(e['additional_leases_per_week'])} leases/week, +{format_number(e['additional_leases_per_year'])} leases/year, ≈ ${format_number(e['annual_revenue_usd'], 0)}/year\n")
        f.write('\n')

        f.write('> Note: "Additional" is calculated from after-hours qualified leads only (leads AI captures that would typically be missed without 24/7 coverage). If you prefer, we can also model a total-leads-based uplift.\n')


def main():
    if not os.path.exists(INPUT_PATH):
        raise SystemExit(f"CSV not found at {INPUT_PATH}")
    rows = load_rows(INPUT_PATH)
    stats = analyze(rows)
    write_markdown(stats)
    print(f"Wrote analysis → {OUTPUT_PATH}")


if __name__ == '__main__':
    main()


