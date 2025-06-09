import { useNavigate, useLocation } from "react-router-dom";
import UserBasicInfo from "./User/UserBasicInfo";
import VenueFeedInfo from "./Venue/VenueFeedInfo";
import BookVenueFeed from "./BookVenueFeed";

const BookVenue = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const venue = location.state?.venue;
  const feature = location.state?.feature;

  const handleSelectVenue = () => {
    navigate("/venue-list", { replace: true });
  };

  return (
    <div className="dashboard">
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Book Venue
      </h3>
      <hr />
      <div className="dashboard-infos">
        <div
          className="dashboard-box center-flex"
        >
          <h4 style={{ display: "flex", justifyContent: "center" }}>User</h4>
          <div className="dashboard-info" style={{ paddingRight: "10vw" }}>
            <UserBasicInfo />
          </div>
        </div>

        <div
          className="dashboard-box center-flex"
        >
          <h4 style={{ display: "flex", justifyContent: "center" }}>Venue</h4>
          <div className="dashboard-info" style={{ paddingRight: "10vw" }}>
            {venue ? (
              <VenueFeedInfo venue={venue} feature={feature} />
            ) : (
                <div>
              <p>Click here to choose the venue</p>
              <button id='select-doctor' 
            style={{ display: "flex", justifyContent: "center", marginTop : '2rem' }}
            onClick={handleSelectVenue}
          >Select Venue</button>
          </div>
            )}
          </div>
        </div>
      </div>
      <div>
            {venue && <BookVenueFeed venue={venue} />}
      </div>
    </div>
  );
};

export default BookVenue;
