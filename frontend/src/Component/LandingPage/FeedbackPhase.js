import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const FeedbackPhase = () => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMessage = async () => {

      try {
        const response = await axios.get("/feedback");
        setMessage(response.data);
        setIsLoading(false);
      }catch(err) {
        console.log(err);
      }
      
    };

    getMessage();
  }, []);
  return !isLoading ? (
    <div className="component2">
      <div className="component2-data">
        {message.length > 0 && (
          <div className="reviewItemInfo">
            <p id="userReview">{message[0].feedback}</p>
            <span id="reviewUserName">- {message[0].name}</span>
          </div>
        )}

        {message.length > 0 && (
          <div className="reviewItemInfo">
            <p id="userReview">{message[1].feedback}</p>
            <span id="reviewUserName">- {message[1].name}</span>
          </div>
        )}

        {message.length > 0 && (
          <div className="reviewItemInfo">
            <p id="userReview">{message[2].feedback}</p>
            <span id="reviewUserName">- {message[2].name}</span>
          </div>
        )}
      </div>

      <div className="component2-info">
        <Link to={"/show-feedbacks"}>
          <p style={{ marginBottom: "20px", alignSelf: "center" }}>View all</p>
        </Link>
      </div>
    </div>
  ) : (
    <div
      className="loading"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <p>Loading....</p>
    </div>
  );
};

export default FeedbackPhase;
