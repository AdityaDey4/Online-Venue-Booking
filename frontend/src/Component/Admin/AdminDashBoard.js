import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import Footer from "../Footer";

const AdminDashBoard = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState();
  const [app, setApp] = useState(0);
  const [venue, setVenue] = useState(0);
  const [user, setUser] = useState(0);
  const [message, setMessage] = useState(0);
  const [todayApp, setTodayApp] = useState(0);
  const effectRan = useRef(false);

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
      const getAdmin = async () => {
        try {
            console.log("Admin Profile")
          const response = await axiosPrivate.get(`/admin/${auth.email}`);

          const response1 = await axios.get("/venue");
          const response2 = await axiosPrivate.get("/user");
          const response3 = await axios.get("/feedback");
          const response4 = await axiosPrivate.get("/detail");

          if (response1.data) setVenue(response1.data.length);
          if (response2.data) setUser(response2.data.length);
          if (response3.data) setMessage(response3.data.length);

          if (response4.data) {
            setApp(response4.data.length);

            const today = formatDateISO(new Date());
            let count = 0;

            response4.data.map((app) => {
              if (app.booking_date === today) count++;
            });

            setTodayApp(count);
          }

          setAdmin(response.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };

      getAdmin();
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
            <text>{`Name : ${admin.name}`}</text> <br></br>
            <text>{`Email : ${admin.email}`}</text> <br></br>
          </div>
          <div className="dashboard-boxes">
            <div className="dashboard-box">
              <h6>Total Users</h6>
              <hr />
              <h1>{user}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Total Venues</h6>
              <hr />
              <h1>{venue}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Total Venue Booking</h6>
              <hr />
              <h1>{app}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Today Venue Booking</h6>
              <hr />
              <h1>{todayApp}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Total Messages</h6>
              <hr />
              <h1>{message}</h1>
            </div>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
