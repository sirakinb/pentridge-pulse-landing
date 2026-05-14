// Single Pentridge audience in Resend. Source is stored in first_name
// so each contact can be filtered by where they signed up.
export const PENTRIDGE_AUDIENCE_ID = 'b61490b3-e4a6-4eb8-b2c3-6dc8b8799480';

export const SOURCES = {
  waitlist: 'waitlist',
  roi: 'roi-calculator',
  newsletter: 'newsletter',
};

export async function addContact(resend, { email, source }) {
  const trimmed = email.trim();
  const firstName = SOURCES[source] || source;
  try {
    // Create is idempotent on email — returns the existing contact without
    // overwriting fields. Follow up with an update so the source tag reflects
    // the latest signup path.
    const create = await resend.contacts.create({
      email: trimmed,
      firstName,
      unsubscribed: false,
      audienceId: PENTRIDGE_AUDIENCE_ID,
    });
    if (create.error) {
      console.warn('addContact create warning:', create.error);
    }
    const update = await resend.contacts.update({
      email: trimmed,
      firstName,
      unsubscribed: false,
      audienceId: PENTRIDGE_AUDIENCE_ID,
    });
    if (update.error) {
      console.warn('addContact update warning:', update.error);
      return { ok: false, error: update.error };
    }
    return { ok: true, id: update.data?.id || create.data?.id };
  } catch (err) {
    console.warn('addContact threw:', err);
    return { ok: false, error: err };
  }
}
