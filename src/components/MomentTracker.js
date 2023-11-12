import React from "react";
import "./MomentTracker.css";

function MomentTracker(props) {
  const renderCircles = () => {
    const circles = [];

    for (let i = 0; i < 48; i++) {
      let isVoted = false;
      if (props.votesArray[i] > 0 && props.votesArray[i] < 11) {
        isVoted = true;
      }

      circles.push(
        <div
          key={i}
          className={`circle ${isVoted ? "filled" : ""} ${
            props.currentMomentIndex === i ? "active-moment-circle" : ""
          }`}
        >
          {i + 1}
        </div>
      );
    }

    return circles;
  };

  return (
    <div className="moment-tracker">
      <h2 className="moment-tracker-h2">All Moments</h2>
      <div className="moment-circles">{renderCircles()}</div>
      <h2 className="moment-tracker-h2">
        Your vote for this moment:
        {props.votesArray[props.currentMomentIndex] === 0 ||
        props.votesArray[props.currentMomentIndex] === undefined
          ? " None"
          : " " + props.votesArray[props.currentMomentIndex]}
      </h2>
    </div>
  );
}

export default MomentTracker;
