import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AllUserSub = ({user}) => {

    const axiosPrivate = useAxiosPrivate(); 
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const getBooking = async () => {
        try {
          const response = await axiosPrivate.get(`/userDetails/${user._id}`);
  
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
                <th>Pic</th>
                <th>Name</th>
                <th>Booking Date</th>
                <th>Visiting Date</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((bumba) => (
                <tr key={bumba._id}>
                  <td>
                    <img
                        className="imgs"
                        src={"http://localhost:3500/v_img/" + bumba.venue_image}
                    />
                    </td>
                  <td>{bumba.venue_name}</td>
                  <td>{bumba.curr_date}</td>
                  <td>{bumba.booking_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{}}>User has not booked any venues yet.</p>
        )
      }
    </div>
  )
}

export default AllUserSub