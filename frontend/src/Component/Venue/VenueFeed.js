import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import Roles from "../../config/Roles";
import VenueFeedInfo from "./VenueFeedInfo";
import axios from "../../api/axios";

// need to add css , after designing the schema I will cover it
const VenueFeed = ({ venue}) => {
  const { auth } = useAuth();
  const [feature, setFeature] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const getVenues = async () => {
        try {
          const id = venue._id;
          const response = await axios.get(
            `/feature/${id}`
          );
          setFeature(response.data);
          setIsLoading(false);
          console.log(feature);
        } catch (err) {
          console.error(err);
        }
      };

      getVenues();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className="venue-feed">
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div>
          <VenueFeedInfo venue={venue} feature={feature} />
          {auth?.role == Roles.User && (
            <Link style={{ textDecoration: 'none'}}
              to="/book-venue"
              state={{
                venue: venue,
                feature : feature
              }}
            >
              <button id="book-venue-bt">Book Venue</button>
             </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default VenueFeed;
