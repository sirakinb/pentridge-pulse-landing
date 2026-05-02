import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pentridgeReviews, pentridgeReviewStats } from '../data/pentridgeReviews';
import MetaTags from '../components/MetaTags';

const bookingUrl = 'https://www.peerspace.com/pages/listings/6357e450d6990c00222cfd89?utm_source=copy_link&utm_campaign=listing_sharing';

const rowConfig = [
  { className: 'wall-love-row-one', duration: '95s' },
  { className: 'wall-love-row-two wall-love-row-reverse', duration: '80s' },
  { className: 'wall-love-row-three', duration: '110s' },
];

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? '' : 'wall-love-star-empty'}>
      ★
    </span>
  ));

const ReviewAvatar = ({ review, modal = false }) => (
  <div className={`wall-love-avatar tone-${review.tone} ${modal ? 'wall-love-avatar-modal' : ''}`}>
    {review.avatarUrl ? (
      <img src={review.avatarUrl} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
    ) : null}
    <span>{review.initials}</span>
  </div>
);

const ReviewCard = ({ review, onOpen, isClone = false }) => {
  const open = () => onOpen(review);

  return (
    <article
      className="wall-love-card"
      role={isClone ? undefined : 'button'}
      tabIndex={isClone ? -1 : 0}
      aria-hidden={isClone ? 'true' : undefined}
      onClick={open}
      onKeyDown={(event) => {
        if (isClone) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      aria-label={isClone ? undefined : `Read ${review.name}'s Peerspace review`}
    >
      <div className="wall-love-card-head">
        <ReviewAvatar review={review} />
        <div className="min-w-0 flex-1">
          <div className="wall-love-name">{review.name}</div>
          <div className="wall-love-role">{review.role}</div>
        </div>
      </div>
      <div className="wall-love-stars" aria-label={`${review.rating} out of 5 stars`}>
        {renderStars(review.rating)}
      </div>
      <p className="wall-love-quote">{review.text}</p>
      <div className="wall-love-card-foot">
        <span>{review.date}</span>
      </div>
    </article>
  );
};

const WallOfLove = ({ showNav = true, showMeta = true }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const rows = useMemo(
    () => rowConfig.map((_, rowIndex) => pentridgeReviews.filter((__, reviewIndex) => reviewIndex % 3 === rowIndex)),
    []
  );

  useEffect(() => {
    if (!selectedReview) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedReview(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedReview]);

  return (
    <main className="wall-love-page">
      {showMeta && (
        <MetaTags
          title="Wall of Love | Pentridge Manor Reviews"
          description="Read 100 real Peerspace reviews from creators, filmmakers, photographers, and event hosts who booked Pentridge Manor."
          keywords="Pentridge Manor reviews, Peerspace reviews, Philadelphia content house, photo studio reviews, video shoot location"
          canonicalUrl="https://www.pentridgemedia.com/wall-of-love"
        />
      )}

      {showNav && (
        <nav className="wall-love-nav" aria-label="Wall of Love navigation">
          <Link to="/" className="wall-love-logo">[P]</Link>
          <div className="wall-love-nav-links">
            <Link to="/services">Services</Link>
            <Link to="/resources/ai-process-automation-examples">Use Cases</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      )}

      <header className="wall-love-hero">
        <p className="wall-love-eyebrow">Pentridge Manor · Reviews</p>
        <h1>
          One Hundred <em>Love Letters</em>
        </h1>
        <span className="wall-love-underline" />
        <p>
          Photographers, filmmakers, musicians, artists, planners and creators have made Pentridge Manor home for a day.
          Here&apos;s what they said when the lights went down.
        </p>
      </header>

      <section className="wall-love-stats" aria-label="Review stats">
        <div>
          <strong>{pentridgeReviewStats.total}+</strong>
          <span>Reviews</span>
        </div>
        <div>
          <strong>{pentridgeReviewStats.averageRating.toFixed(2)}</strong>
          <span>Avg · Rating</span>
        </div>
        <div>
          <strong>{pentridgeReviewStats.wouldRebookPercent}%</strong>
          <span>Would Rebook</span>
        </div>
      </section>

      <section className="wall-love-wall" aria-label="Peerspace review wall">
        {rows.map((rowReviews, rowIndex) => {
          const doubledReviews = [...rowReviews, ...rowReviews];

          return (
            <div
              key={rowConfig[rowIndex].className}
              className={`wall-love-row ${rowConfig[rowIndex].className}`}
              style={{ '--wall-love-duration': rowConfig[rowIndex].duration }}
            >
              <div className="wall-love-track">
                {doubledReviews.map((review, index) => (
                  <ReviewCard
                    key={`${review.name}-${review.date}-${index}`}
                    review={review}
                    onOpen={setSelectedReview}
                    isClone={index >= rowReviews.length}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <div className="wall-love-hint">
        <span />
        Hover · pause &nbsp;·&nbsp; Click · expand
      </div>

      <section className="wall-love-footer-cta">
        <p className="wall-love-eyebrow">The Manor Awaits</p>
        <h2>Add yours next.</h2>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="wall-love-cta">
          Inquire about your shoot <ArrowRight size={14} />
        </a>
      </section>

      {selectedReview && (
        <div
          className="wall-love-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedReview(null);
          }}
        >
          <article className="wall-love-modal-card" role="dialog" aria-modal="true" aria-labelledby="wall-love-modal-title">
            <button type="button" className="wall-love-modal-close" onClick={() => setSelectedReview(null)}>
              [ ESC ]
            </button>
            <div className="wall-love-card-head">
              <ReviewAvatar review={selectedReview} modal />
              <div className="min-w-0 flex-1">
                <h2 id="wall-love-modal-title" className="wall-love-name">{selectedReview.name}</h2>
                <div className="wall-love-role">{selectedReview.role}</div>
              </div>
            </div>
            <div className="wall-love-stars" aria-label={`${selectedReview.rating} out of 5 stars`}>
              {renderStars(selectedReview.rating)}
            </div>
            <p className="wall-love-quote wall-love-quote-full">{selectedReview.text}</p>
            <div className="wall-love-card-foot">
              <span>{selectedReview.date}</span>
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default WallOfLove;
