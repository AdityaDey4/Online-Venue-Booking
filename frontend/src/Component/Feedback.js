import { useState, useEffect, useRef } from "react"
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom"

const Feedback = () => {

    const messageRef = useRef();
    const errRef = useRef();

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const {auth} = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=> {

       const getUser = async ()=> {
            try {
                const response = await axiosPrivate.get(`user/${auth.email}`);

                setFullName(response.data.name);
                setEmail(response.data.email);
            }catch(err) {
                // setErrMsg(err.message);
            }
       }

       getUser();
    }, [])

    useEffect(()=> {
        setErrMsg('');
    }, [fullName, email, message])

    // need to modify
    const handleSubmit = async (e)=> {

        e.preventDefault();

        var currentTime = new Date();
        var currentOffset = currentTime.getTimezoneOffset();

        var ISTOffset = 330;   // IST offset UTC +5:30 
        var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        var hoursIST = ISTTime.getHours()
        var minutesIST = ISTTime.getMinutes()

        const time = hoursIST+":"+minutesIST;
        const date = currentTime.toString().substring(4, 15)
        try {

            const response = await axiosPrivate.post(
                '/feedback',
                JSON.stringify({
                    name : fullName,
                    email, 
                    feedback : message,
                    date,
                    time
                    // role : auth.role
                }),
                {
                    headers : {"Content-Type" : "application/json"},
                    withCredentials : true
                }
            )

            navigate(from, {replace : true});
        }catch(err) {
            setErrMsg("You are requested to re-login after connecting internet.");
        }
    }
  return (
    <div className="feedback-page">
        <section className="mid-window">
            <p
                ref={errRef}
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
            >
             {errMsg}
            </p>
            <h3>Your Message</h3>
            <h1>Always Connect With Us</h1>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name :</label>
                <input
                    type="text"
                    id="fullname"
                    autoComplete="off"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    disabled={true}
                    required
                />

                <label htmlFor="email">Email :</label>
                <input 
                    type="email"
                    id="email"
                    disabled={true}
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="message">Message to us :</label>
                <textarea
                    type="text"
                    id="message"
                    ref={messageRef}
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                />

                <button 
                    id="feedback-bt"
                    disabled={!fullName || !email || !message}
                >Submit</button>
            </form>
        </section>
    </div>
  )
}

export default Feedback