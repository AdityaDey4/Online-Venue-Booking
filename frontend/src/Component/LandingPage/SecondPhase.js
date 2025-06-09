const image = require("../../images/venueInfo2.png");

const SecondPhase = () => {
  return (
    <div className="firstPhase">
      <img className="venue" src={image} alt="Venue1" />
      <div className="info">
        <p className="infoTitle">Common Q&A of an User</p>
        <p className="infoSummary">
          <div className="questions">
            <p id="q1">Q. Is there anu venues for Birthday Party ?</p>
            <p id="a1">
              Ans. Yes, obviously we have several venues for not only birthday
              parties but also for Farewell, Anniversary parties, Small
              gathering etc.
            </p>
          </div>
          <div className="questions">
            <p id="q1">Q. Is there any venues available in Kolkata ?</p>
            <p id="a1">Ans. Yes, we have several venues located in Kolkata.</p>
          </div>
          <div className="questions">
            <p id="q1">Q. How to book any venue ?</p>
            <p id="a1">
            Ans. Firstly you just have to login to this website, then click the
              venue which you would like to book. Afterthat, choose the date and
              then it will be successfully booked.
            </p>
          </div>
        </p>
      </div>
    </div>
  );
};

export default SecondPhase;
