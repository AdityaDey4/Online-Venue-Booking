import React from "react";
import { Link, Outlet } from "react-router-dom";

const OwnerBooking = () => {
  return (
    <div
      className="booking-details"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "7mm",
          listStyle: "none",
        }}
      >
        <Link to={"/owner/booking-details/previous"}>
          <button>
            <span>Previous</span>
          </button>
        </Link>
        <Link to={"/owner/booking-details/today"}>
          <button>
            <span>Today</span>
          </button>
        </Link>
        <Link to={"/owner/booking-details"}>
          <button>
            <span>Upcoming</span>
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default OwnerBooking;
