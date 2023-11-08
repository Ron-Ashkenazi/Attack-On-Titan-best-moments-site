import React from "react";
import "./WinTieLoseRate.css";

function WinTieLoseRate(props) {
  const winRate = ((props.win / props.totalVotes) * 100).toFixed(0);
  const tieRate = ((props.tie / props.totalVotes) * 100).toFixed(0);
  const loseRate = ((props.lose / props.totalVotes) * 100).toFixed(0);

  return (
    <div className="win-tie-lose-rate-div">
      <p className="win-tie-lose-p-total-votes">
        Total Votes: {props.totalVotes}
      </p>
      <div className="column-div">
        <h3 className="general-h3 win-h3">Win rate</h3>
        <p className="win-tie-lose-p">
          {winRate}% ({props.win})
        </p>
      </div>
      <div className="column-div">
        <h3 className="general-h3 tie-h3">Tie rate</h3>
        <p className="win-tie-lose-p">
          {tieRate}% ({props.tie})
        </p>
      </div>
      <div className="column-div">
        <h3 className="general-h3 lose-h3">Lose rate</h3>
        <p className="win-tie-lose-p">
          {loseRate}% ({props.lose})
        </p>
      </div>
    </div>
  );
}

export default WinTieLoseRate;
