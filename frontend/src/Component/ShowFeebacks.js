import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";

const ShowFeedbacks = () => {

    const [feedback, setFeedback] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(()=> {

        if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
            
            const getFeedback = async ()=> {

                try {
                    const response = await axios.get('/feedback');
                    setFeedback(response.data);
                    setIsLoading(false);
                }catch(err) {
                    // console.error(err);
                }
            }

            getFeedback();
        }

        return ()=> {
            effectRan.current = true;
        }
    }, [])

  return (
    <div className="dashboard">
      {!isLoading && feedback ? (
        <div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Feedback</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((bumba) => (
                  <tr key={bumba._id}>
                    <td>{bumba.name}</td>
                    <td>{bumba.feedback}</td>
                    <td>{bumba?.date && bumba?.time ? bumba.date+" "+bumba.time : "NA"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading....</p>
        </div>
      )}
    </div>
  )
}

export default ShowFeedbacks