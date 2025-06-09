const image = require("../../images/toadbury-hall.jpg");

const ThirdPhase = () => {
  return (
    <div className="firstPhase">
      <div className="info">
        <p className="infoTitle">Why you should choose us ?</p>
        <p className="infoSummary">
        Because we have the best venues available all over India. You Can have these venues for Marriage Parties, Birthday Parties, Farewell, Small Gathering, Bachelor Party, Photo Shoot, Video Shoot, Children Parties etc. Even we have several facilies available as well like Smoking Area, DJ, Wi-fi, Power Backup, Fullbar, Nightlife etc. Now according to your preferance book venues now. Hurry Up !!!!!
        </p>
      </div>

      <img className="venue" src={image} alt="Venue1" />
    </div>
  )
}

export default ThirdPhase