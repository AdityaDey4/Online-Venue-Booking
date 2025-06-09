import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
const user = require("../../images/user.jpg");

const UserProfile = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="patient-profile-page">
      <nav className="menu" tabindex="0">
        <header className="avatar">
          <img src={user} />
          <h6 style={{ paddingTop: "1rem" }}>{auth.email}</h6>
        </header>

        <div style={{display : "flex", flexDirection : "column", justifyContent : "space-between"}}>
          <div>
            <ul>
              <Link style={{ textDecoration: 'none'}} to={"/user"}>
                <li tabindex="0" className="icon-dashboard">
                  <span>Dashboard</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/user/booking-details"}>
                <li tabindex="0" className="icon-appointment">
                  <span>Booking Details</span>
                </li>
              </Link>

              <Link style={{ textDecoration: 'none'}} to={"/user/user-feedback"}>
                <li tabindex="0" className="icon-appointment">
                  <span>Feedbacks</span>
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <ul>
              <Link style={{ textDecoration: 'none'}} to={"/"}>
                <li tabindex="0" className="icon-appointment">
                  <span>Go to home...</span>
                </li>
              </Link>

              <li tabindex="0" className="icon-logout" onClick={handleLogout}>
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

export default UserProfile;
