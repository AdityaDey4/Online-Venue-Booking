import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const admin = require("../../images/admin.png");

const AdminProfile = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="doctor-profile-page">
      <nav className="menu" tabindex="0">
        <header className="avatar">
          <img src={admin} />
          <h6 style={{ paddingTop: "1rem" }}>{auth.email}</h6>
        </header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ul>
              <Link style={{ textDecoration: 'none'}} to={"/admin"}>
                <li className="icon-dashboard">
                  <span>Dashboard</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/admin/all-booking-details"}>
                <li className="icon-appointment">
                  <span>Booking Details</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/admin/all-venues"}>
                <li className="icon-doctors">
                  <span>Venues</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/admin/all-feedbacks"}>
                <li className="icon-messages">
                  <span>Feedbacks</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/admin/all-owners"}>
                <li className="icon-messages">
                  <span>Owners</span>
                </li>
              </Link>


              <Link style={{ textDecoration: 'none'}} to={"/admin/all-users"}>
                <li className="icon-messages">
                  <span>Users</span>
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <ul>
              <Link style={{ textDecoration: 'none'}} to={"/"}>
                <li className="icon-doctors">
                  <span>Go to Home...</span>
                </li>
              </Link>

              <li className="icon-logout" onClick={handleLogout}>
                <span>Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminProfile;
