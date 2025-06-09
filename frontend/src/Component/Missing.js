import { Link } from "react-router-dom"
// need to add css
const Missing = () => {
  return (
    <div className="missing" >
        <h1>404</h1>
        <h2>Oops!, Page Not Found</h2>
        <div className="flexGrow">
            <Link to="/">Visit Our Homepage</Link>
        </div>
    </div>
  )
}

export default Missing