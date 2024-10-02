import { Button } from '@/components/ui/button'; // Import the Button component

function BookingButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <Button
        asChild // Use asChild prop to render an anchor tag
      >
        <a
          href="https://app.acuityscheduling.com/schedule.php?owner=32940683"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your next photo/video shoot
        </a>
      </Button>
      {/* ... other buttons ... */}
    </div>
  );
}

export default BookingButtons;