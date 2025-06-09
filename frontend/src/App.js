import Layout from "./Component/Layout";
import MainLayout from "./Component/MainLayout";

import Home from "./Component/Home";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Unauthorized from "./Component/Unauthorized";
import Missing from "./Component/Missing";
import Feedback from "./Component/Feedback";
import VenueList from "./Component/Venue/VenueList";
import ShowFeedbacks from "./Component/ShowFeebacks";

import UserBooking from "./Component/User/UserBooking";
import AdminBooking from "./Component/Admin/AdminBooking";

import VenueOwnerRegister from "./Component/VenueOwner/VenueOwnerRegister";

import UserProfile from "./Component/User/UserProfile";
import UserDashboard from "./Component/User/UserDashBoard";
import UserFeedbacks from "./Component/User/UserFeedbacks";
import UserBookingDetails from "./Component/User/UserBookingDetails";
import BookVenue from "./Component/BookVenue";

import AdminProfile from "./Component/Admin/AdminProfile";
import AdminDashBoard from "./Component/Admin/AdminDashBoard";
import AllVenues from "./Component/Admin/AllVenues";
import AllOwners from "./Component/Admin/AllOwners";
import AllUsers from "./Component/Admin/AllUsers";
import AllBookingDetails from "./Component/Admin/AllBookingDetails"
import AllFeedbacks from "./Component/Admin/AllFeedbacks";

import OwnerProfile from "./Component/VenueOwner/OwnerProfile";
import OwnerDashboard from "./Component/VenueOwner/OwnerDashboard";
import OwnerVenues from "./Component/VenueOwner/OwnerVenues";
import OwnerBooking from "./Component/VenueOwner/OwnerBooking";
import OwnerBookingDetails from "./Component/VenueOwner/OwnerBookingDetails";

import RequireAuth from "./Component/RequireAuth";
import PersistLogin from "./Component/PersistentLogin";

import Roles from "./config/Roles";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<PersistLogin />}>
          <Route element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="venueOwnerRegister" element={<VenueOwnerRegister />} />
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="venue-list" element={<VenueList />} />
            <Route path="show-feedbacks" element={<ShowFeedbacks />} />

            <Route element={<RequireAuth allowedRoles={[Roles.User]} />}>
              <Route path="feedback" element={<Feedback />} />
              <Route path="book-venue" element={<BookVenue />} />
            </Route>
          </Route>


          <Route element={<RequireAuth allowedRoles={[Roles.User]} />}>
            <Route path="user" element={<UserProfile />}>
              <Route index element={<UserDashboard />} />
              <Route path="user-feedback" element={<UserFeedbacks />} />
              <Route path="booking-details" element={<UserBooking />} >
                <Route index element={<UserBookingDetails value={"upcoming"}/>} />
                <Route path="previous" element={<UserBookingDetails value={"previous"}/>} />
                <Route path="today" element={<UserBookingDetails value={"today"}/>} />
              </Route>
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
            <Route path="admin" element={<AdminProfile />}>
              <Route index element={<AdminDashBoard />} />
              <Route path="all-venues" element={<AllVenues />} />
              <Route path="all-owners" element={<AllOwners />} />
              <Route path="all-users" element={<AllUsers />} />
              <Route path="all-booking-details" element={<AdminBooking />} >
                <Route index element={<AllBookingDetails value={"upcoming"}/>} />
                <Route path="previous" element={<AllBookingDetails value={"previous"}/>} />
                <Route path="today" element={<AllBookingDetails value={"today"}/>} />
              </Route>
              <Route path="all-feedbacks" element={<AllFeedbacks />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.VenueOwner]} />}>
            <Route path="owner" element={<OwnerProfile />} >
              <Route index element={<OwnerDashboard />}/>
              <Route path="owner-venues" element={<OwnerVenues />} />
              <Route path="booking-details" element={<OwnerBooking />} >
                <Route index element={<OwnerBookingDetails value={"upcoming"}/>} />
                <Route path="previous" element={<OwnerBookingDetails value={"previous"}/>} />
                <Route path="today" element={<OwnerBookingDetails value={"today"}/>} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
