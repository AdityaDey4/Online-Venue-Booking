import React from "react";

const VenueFeedInfo = ({ venue, feature }) => {
  var bestFor = [];
  if (feature.bestFor) {
    Object.keys(feature.bestFor).map((key) => {
      if (feature.bestFor[key]) bestFor.push(key);
    });
  }

  var facilities = [];
  if (feature.facilities) {
    Object.keys(feature.facilities).map((key) => {
      if (feature.facilities[key]) facilities.push(key);
    });
  }

  const imageSrc = "http://localhost:3500/v_img/" + venue.image;
  return (
    <div className="venue-feed2">
      <div className="venue-feed-info">
        <img
          style={{ alignSelf: "center", marginRight: "10px" }}
          className="imgs"
          src={imageSrc}
        />
        <div className="venue-info">
          <text>{`Name : ${venue.name}`}</text> <br></br>
          <text>{`Address : ${venue.address}`}</text> <br></br>
          <text>{`Price : ${venue.price}/- per person`}</text> <br></br>
          <text>{`Description : ${venue.description}`}</text> <br></br>
          <text>{`Maximum People : ${venue.max_people}`}</text> <br></br>
        </div>
      </div>
      <div className="venue-feed-details">
        <h4>Best For : </h4>
        <ol>
          {bestFor.length != 0 ? bestFor.map((b) => <><li>{b}</li></>) : "None"}
        </ol>

        <h4>Facilities : </h4>
        <ol>
          {facilities.length != 0 ? (
            facilities.map((b) => <li>{b}<br /></li>)
          ) : (
            "None"
          )}
        </ol>
      </div>
    </div>
  );
};

export default VenueFeedInfo;
