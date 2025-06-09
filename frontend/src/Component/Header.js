import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import ROLES from "../config/Roles"

const Header = () => { 
  const {auth} = useAuth();
  
  return (
    <header className="header">
        <div className="webName">
            <h1>Online Venue Booking System</h1>
        </div>
        <div className="header-list">
            <ul>
                <Link style={{ textDecoration: 'none'}} to={'/'}><li>Home</li></Link>
                <Link style={{ textDecoration: 'none'}} to={'/venue-list'}><li>Venues</li></Link>
                <Link style={{ textDecoration: 'none'}} to={'/book-venue'}><li>Book Venues</li></Link>
                <Link style={{ textDecoration: 'none'}} to={'/feedback'}><li>Feedback</li></Link>
                {
                  auth?.role
                    ? auth.role==ROLES.User
                      ? <Link style={{ textDecoration: 'none'}} to={'/user'}><li>User Profile</li></Link>
                      : auth.role == ROLES.Admin
                        ? <Link style={{ textDecoration: 'none'}} to={'/admin'}><li>Admin Profile</li></Link>
                        : <Link style={{ textDecoration: 'none'}} to={'/owner'}><li>Owner Profile</li></Link>
                    : <Link style={{ textDecoration: 'none'}} to={'/login'}><li>Sign In</li></Link>
                }
            </ul>
        </div>
    </header>
  )
}

export default Header