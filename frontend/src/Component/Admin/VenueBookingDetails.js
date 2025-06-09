import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const VenueBookingDetails = ({venue}) => {

    const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axiosPrivate.get(`/venueDetails/${venue._id}`);

        setBooking(response.data);
        setIsLoading(false);
      } catch (err) {}
    };

    getBooking();
  }, []);
  return (
    <div>
      { isLoading
        ?<div className="loading">
            <p>Loading....</p>
        </div>
        : booking.length != 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Booking Date</th>
                <th>Visiting Date</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((bumba) => (
                <tr key={bumba._id}>
                  <td>{bumba.user_name}</td>
                  <td>{bumba.user_email}</td>
                  <td>{bumba.curr_date}</td>
                  <td>{bumba.booking_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{}}>Venue has not been booked yet.</p>
        )
      }
    </div>
  );
};

export default VenueBookingDetails;
