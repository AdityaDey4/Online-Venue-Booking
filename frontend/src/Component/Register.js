
import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";


const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const FULLNAME_REGEX = /^[a-z A-Z]*$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MOBILE_REGEX = /^\+?[1-9][0-9]{7,14}$/;

const Register = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [password, setPassWord] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [mobile, setMobile] = useState();
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [address, setAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(()=> {
    setErrMsg('');
  }, [fullName, email, password, mobile, address]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = FULLNAME_REGEX.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    setValidMobile(result);
  }, [mobile]);

  // need to navigate
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "/userRegister",
        JSON.stringify({
          email,
          name: fullName,
          password,
          mobile,
          address,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setEmail("");
      setValidEmail(false);
      setEmailFocus(false);

      setFullName("");
      setValidFullName(false);
      setFullNameFocus(false);

      setPassWord("");
      setValidPassword(false);
      setPasswordFocus(false);

      setMobile();
      setValidMobile(false);
      setMobileFocus(false);

      setAddress("");

      console.log(responce.data);
      setSuccess(true);
      
      handleAuth();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Responce");
      } else if (err.response?.status === 409) {
        setErrMsg("Provided email has already registerd");
      } else {
        setErrMsg(err.message+"  please try again");
      }
      errRef.current.focus();
    }
  };

  const handleAuth = async ()=> {

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

      navigate(from, {replace : true});
  }

  return (
    <div className="register-page">
      
        <section className="mid-window">
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>User</h1>

          <form className="reg-form">
            <label htmlFor="email">
              Email :
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={(e) => setEmailFocus(true)}
              onBlur={(e) => setEmailFocus(false)}
            />

            <p
              id="uidnote"
              className={
                emailFocus && !validEmail ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Write your valid email address.
            </p>

            <label htmlFor="fullname">
              FullName :
              <span className={validFullName && fullName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validFullName || !fullName ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="text"
              id="fullname"
              onChange={(e) => setFullName(e.target.value)}
              required
              aria-invalid={validFullName ? "false" : "true"}
              aria-describedby="fidnote"
              onFocus={(e) => setFullNameFocus(true)}
              onBlur={(e) => setFullNameFocus(false)}
            />

            <p
              id="fidnote"
              className={
                fullNameFocus && (!validFullName || !fullName)
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Write your full name with letterrs & space.
            </p>

            <label htmlFor="password">
              Password :
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="password"
              id="password"
              onChange={(e) => setPassWord(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={(e) => setPasswordFocus(true)}
              onBlur={(e) => setPasswordFocus(false)}
            />

            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters are :
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="mobile">
              Mobile :
              <span className={validMobile && mobile ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMobile || !mobile ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="number"
              id="mobile"
              onChange={(e) => setMobile(Number(e.target.value))}
              required
              aria-invalid={validMobile ? "false" : "true"}
              aria-describedby="midnote"
              onFocus={(e) => setMobileFocus(true)}
              onBlur={(e) => setMobileFocus(false)}
            />

            <p
              id="midnote"
              className={
                mobileFocus && (!validMobile || !mobile)
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Write your valid mobile Number.
            </p>

            <label htmlFor="address">Address : *</label>

            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            />

            <button
              disabled={
                !validEmail ||
                !validFullName ||
                !validPassword ||
                !validMobile ||
                !address
              }
              id="signin-bt"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>

          <p>
            Already Registered ?
            <span className="line">
              <Link to={"/login"} replace>
                Log In
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

export default Register;
