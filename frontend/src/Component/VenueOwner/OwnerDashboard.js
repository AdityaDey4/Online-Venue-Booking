import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import Footer from "../Footer";
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";

export const OwnerDashboard = () => {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();

  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState();
  const [app, setApp] = useState(0);
  const [venue, setVenue] = useState(0);
  const [todayApp, setTodayApp] = useState(0);
  const effectRan = useRef(false);

  
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };


    const formatDateISO = (date) => {
      // Convert the date to ISO string
      const isoString = date.toISOString();
      // Split at the "T" character to get the date part
      const formattedDate = isoString.split("T")[0];
      return formattedDate;
    };
  
    useEffect(() => {
      let isMounted = true;
      if (effectRan.current === true || process.env.NODE_ENV !== "development") {
        const getOwner = async () => {
          try {
              console.log("Owner Profile")
            const response = await axiosPrivate.get(`/venueOwner/${auth.email}`);
            const response4 = await axiosPrivate.get(
              `/venueOwnerDetails/${auth.email}`
            );
            const response3 = await axiosPrivate.get(
              `/venueOwnerVenues/${auth.email}`
            );

            if (response3.data) setVenue(response3.data.length);
            if (response4.data) {
              setApp(response4.data.length);
  
              const today = formatDateISO(new Date());
              let count = 0;
  
              response4.data.map((app) => {
                if (app.booking_date === today) count++;
              });
  
              setTodayApp(count);
            }
  
            setOwner(response.data);
            setLoading(false);
          } catch (err) {
            console.error(err);
            handleLogout();
          }
        };
  
        getOwner();
      }
  
      return () => {
        isMounted = false;
        effectRan.current = true;
      };
    }, []);
  return (
    <div>
      {loading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="dashboard-info">
            <text>{`Name : ${owner.name}`}</text> <br></br>
            <text>{`Email : ${owner.email}`}</text> <br></br>
          </div>
          <div className="dashboard-boxes">

            <div className="dashboard-box">
              <h6>Venues</h6>
              <hr />
              <h1>{venue}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Venue Booking</h6>
              <hr />
              <h1>{app}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Today Venue Booking</h6>
              <hr />
              <h1>{todayApp}</h1>
            </div>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerDashboard;