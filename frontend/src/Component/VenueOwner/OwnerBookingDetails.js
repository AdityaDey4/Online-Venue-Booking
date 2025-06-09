import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Footer from "../Footer";
import useAuth from "../../hooks/useAuth";

const OwnerBookingDetails = ({ value }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getAllBookingDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/venueOwnerDetails/${auth.email}`);
        setBooking(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getAllBookingDetails();
  }, []);
  const formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    const filteredResults = booking.filter(
      (venue) =>
        venue?.venue_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue?.user_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue?.user_email.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue?.curr_date.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue?.booking_date.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const date = formatDateISO(new Date());

    console.log(value);
    console.log(date);

    if (value === "upcoming") {
      // sort in ascending order
      const result = filteredResults.filter((num) => num.booking_date > date);
      setSearchResults(
        result.sort((a, b) =>
          a.booking_date > b.booking_date
            ? 1
            : a.booking_date < b.booking_date
            ? -1
            : 0
        )
      );
    } else if (value === "previous") {
      // sort in descending order
      const result = filteredResults.filter((num) => num.booking_date < date);
      setSearchResults(
        result.sort((a, b) =>
          b.booking_date > a.booking_date
            ? 1
            : b.booking_date < a.booking_date
            ? -1
            : 0
        )
      );
    } else {
      // today
      const result = filteredResults.filter((num) => num.booking_date == date);
      setSearchResults(result);

      console.log(date);
    }
  }, [booking, search, value]);

  return (
    <div className="dashboard">
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div>
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input
              id="search"
              type="text"
              placeHolder="search booking details"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {searchResults?.length != 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Venue</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Booking Date</th>
                  <th>Visiting Date</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((bumba) => (
                  <tr key={bumba._id}>
                    <td>
                      <img
                        className="imgs"
                        src={"http://localhost:3500/v_img/" + bumba.venue_image}
                      />
                    </td>
                    <td>{bumba.venue_name}</td>
                    <td>{bumba.user_name}</td>
                    <td>{bumba.user_email}</td>
                    <td>{bumba.curr_date}</td>
                    <td>{bumba.booking_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No result found.</p>
          )}
        </div>
      )}
      <div style={{ marginTop: "10rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default OwnerBookingDetails;
