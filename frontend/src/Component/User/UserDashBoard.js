import React from "react";
import { useState, useEffect, useRef } from "react";
import UserBasicInfo from "./UserBasicInfo";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Footer from "../Footer";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserDashboard = () => {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [app, setApp] = useState(0);
  const [todayApp, setTodayApp] = useState(0);
  const [message, setMessage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  const formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const getResponses = async () => {
        try {

          const user = await axiosPrivate.get(
            `/user/${auth.email}`
          );
          const response1 = await axiosPrivate.get(
            `/userdetails/${user.data._id}`
          );
          const response2 = await axios.get("/feedback");

          if (response1.data) {
            setApp(response1.data.length);
            const today = formatDateISO(new Date());

            let count = 0;

            response1.data.map((app) => {
              if (app.booking_date === today) count++;
            });

            setTodayApp(count);
          }

          if (response2.data) {
            let count = 0;
            response2.data.map((msg) => {
              if (msg.email === auth.email) count++;
            });

            setMessage(count);
            setIsLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      getResponses();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="dashboard-info">
            <UserBasicInfo />
          </div>
          <div className="dashboard-boxes">
            <div className="dashboard-box">
              <h6>Total Booking</h6>
              <hr />
              <h1>{app}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Today Fixture</h6>
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

export default UserDashboard;
