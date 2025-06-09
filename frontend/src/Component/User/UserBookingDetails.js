import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Footer from ".././Footer";

const UserBookingDetails = ({value}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [booking, setBooking] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getBooking = async () => {
      try {
        const user = await axiosPrivate.get(`/user/${auth.email}`);
        const response = await axiosPrivate.get(
          `/userDetails/${user.data._id}`
        );

        setBooking(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getBooking();
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
      (details) =>
        details.venue_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        details.curr_date.toLowerCase().includes(search.toLocaleLowerCase()) ||
        details.booking_date.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const date = formatDateISO(new Date());// only date not day

    if(value === "upcoming") { // sort in ascending order
      const result = filteredResults.filter(num => num.booking_date > date);
      setSearchResults(result.sort((a, b)=> (a.booking_date > b.booking_date  ? 1 : a.booking_date<b.booking_date ? -1 : 0)));
    } else if(value === "previous") { // sort in descending order
      const result = filteredResults.filter(num => num.booking_date < date);
      setSearchResults(result.sort((a, b)=> (b.booking_date > a.booking_date  ? 1 : b.booking_date<a.booking_date ? -1 : 0)));
    } else { // today
      const result = filteredResults.filter(num => num.booking_date == date);
      setSearchResults(result);

      console.log(date);
    }
  }, [booking, search, value]); 


  return (
    <div className="patient-appointments dashboard">
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div className="patient-ul=list">
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
          {searchResults.length != 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
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
                    <td>{bumba.curr_date}</td>
                    <td>{bumba.booking_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Results Found.</p>
          )}
        </div>
      )}
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default UserBookingDetails;
