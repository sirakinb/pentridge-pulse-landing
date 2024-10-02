import React from 'react';

const BookingOptions = () => {
  const options = [
    { duration: 1, price: 68 },
    { duration: 2, price: 136 },
    { duration: 3, price: 204 },
    { duration: 4, price: 272 },
    { duration: 5, price: 340 },
    { duration: 6, price: 408 },
    { duration: 7, price: 470 },
    { duration: 8, price: 577 },
  ];

  return (
    <div className="booking-options">
      {options.map((option) => (
        <div key={option.duration} className="option">
          <h3>Photo/Video Shoot ({option.duration} hour{option.duration > 1 ? 's' : ''})</h3>
          <p>{option.duration} hour{option.duration > 1 ? 's' : ''} @ ${option.price.toFixed(2)}</p>
          <a 
            href="https://app.acuityscheduling.com/schedule.php?owner=32940683" 
            className="book-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Shoot
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookingOptions;