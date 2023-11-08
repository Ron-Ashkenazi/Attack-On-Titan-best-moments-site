import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./BarChart.css";

const BarChart = (props) => {
  const totalVotes = props?.voteData.reduce(
    (total, item) => total + item.votes,
    0
  );

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 750);
  };

  useEffect(() => {
    // Update the screen size initially and whenever the window is resized
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // Calculate the percentage for each label
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: props?.voteData.map(
          (item) => `${item.label} (${item.votes})`
        ),
        labels: {
          style: {
            fontSize: "16px", // Set the desired font size for the x-axis labels
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "16px", // Set the desired font size for the y-axis labels
          },
          formatter: function (value) {
            return parseInt(value); // Display integers without decimals
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "75%", // Adjust the width of the columns if needed
          colors: {
            ranges: [
              {
                from: 0,
                to: 10000,
                color: "#29521f",
              },
            ],
          },
        },
      },
    },
    series: [
      {
        name: "Percentage",
        data: props?.voteData.map((item) =>
          ((item.votes / totalVotes) * 100).toFixed(0)
        ),
      },
    ],
  };

  const totalScore = props?.voteData.reduce(
    (total, item) => total + item.label * item.votes,
    0
  );
  const averageScore = (totalScore / totalVotes).toFixed(2);

  return (
    <div className="main-div-bar-chart">
      <h2 className="bar-chart-h2">Vote Percentagese (Votes)</h2>
      <Chart
        className="bar-chart"
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={isSmallScreen ? 280 : undefined}
      />
      <div className="div-average-total">
        <p className="average-score-p">Average Score: {averageScore}</p>
        <p className="total-votes-p">Total Votes: {totalVotes}</p>
      </div>
    </div>
  );
};

export default BarChart;
