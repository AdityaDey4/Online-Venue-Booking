import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const BookVenueFeed = ({ venue }) => {

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=> {
    
    const getUser = async ()=> {
      
      try {
        const response = await axiosPrivate.get(
          `/user/${auth.email}`
        );
        setUser(response.data);
        setIsLoading(false);
      }catch(err) {
        console.error(err);
      }
    }

    getUser();
  }, [])

  const handleOnChange = (value) => {
    // console.log("Today : "+new Date()+new Date().toDateString())
    // console.log("Date : "+value); // Date : Thu Dec 12 2024 00:00:00 GMT+0530 (India Standard Time)
    // console.log(value.toDateString());
    setDate(value);
  };

  const formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.post(
        "/detail",
        JSON.stringify({
          user_id : user._id,
          venue_id: venue._id,
          curr_date: formatDateISO(new Date()), // it set the date uniquely
          booking_date: formatDateISO(date) // helpful for sorting according to date
        })
      );

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    isLoading
      ? <div className="loading">
          <p>Loading....</p>
      </div>
      :
    <div className="schedule-container">
      <div className="schedule">
        <h4 style={{ alignSelf: "center" }}>Select Date </h4>
        <Calendar minDate={new Date()} onChange={handleOnChange} value={date} />
      </div>
      <div className="schedule-container-bt">
        <button id="schedule-container-bt" onClick={handleSubmit}>
            Book Venue
        </button>
      </div>
    </div>
  );
};

export default BookVenueFeed;
