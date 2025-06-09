import { Link } from "react-router-dom";

const image = require("../../images/venueInfo1.png");

const FirstPhase = () => {

  const handleButtonClick = ()=> { 
    <Link to={'/book-venue'} />
  }
  return (
    <div className="firstPhase">
      <div className="info">
        <p className="infoTitle">Book Venues for any Events</p>
        <p className="infoSummary">
        One time or recurring events are being set up by people, companies or organisations for various gatherings all over the world all the time. In many of these cases, the event is limited by the number of participants that can participate and in such case it is important that people reserve their place. Very often, the organizer may also want to accept payments from the participants and then, an online appointment scheduler can be very useful, because people can pay at the same time they make a booking.
        </p>
        <Link style={{ textDecoration: 'none'}} to={'/book-venue'} ><button id="book-venue-bt">BOOK VENUE</button></Link>
      </div>

      <img className="venue" src={image} alt="Venue1" />
    </div>
  );
};

export default FirstPhase;
