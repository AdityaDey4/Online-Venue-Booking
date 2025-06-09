import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // need to navigate
    const handleSubmit = async (e)=> {
      e.preventDefault();
      console.log("login button clicked");
      try {

        const response = await axios.post(
          '/auth',
          JSON.stringify({email, password}),
          {
            headers : {"Content-Type" : "application/json"},
            withCredentials : true
          }
        );

          console.log(JSON.stringify(response?.data));
          const resEmail = response?.data?.email;
          const resRole = response?.data?.role;
          const resAccessToken = response?.data?.accessToken;
          setAuth({email : resEmail, role : resRole, accessToken : resAccessToken});

          setEmail('');
          setPassword('');
          navigate(from, {replace : true});

      } catch(err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing username or password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized, invalid username or password");
        } else {
          setErrMsg("Login Failed");
        }

        errRef.current.focus();
      }
    }

  return (
    <div className="login-page">
      <section className="mid-window">
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form className="log-form">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button id="login-bt" 
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        <p>
          Create an account ?
          <span className="line">
            <Link to={"/register"} replace>
              Sign Up
            </Link>
          </span>
        </p>
        <p>
            Wanna be a Venue Owner? 
            <span className="line">
              <Link to={"/venueOwnerRegister"} replace>
                Click Here
              </Link>
            </span>
          </p>
      </section>
    </div>
  );
};

export default Login;
