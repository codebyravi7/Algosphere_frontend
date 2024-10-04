import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const RatingGraph = ({ contestData }) => {
  // Create serial numbers for the x-axis
  const contestNumbers = contestData?.map((_, index) => index + 1);
  const ratings = contestData?.map((contest) => contest.newRating);
  const contestNames = contestData?.map((contest) => contest.contestName);

  const data = {
    labels: contestNumbers,
    datasets: [
      {
        label: "Rating Progression",
        data: ratings,
        fill: false,
        borderColor: "#4CAF50",
        backgroundColor: "#81C784",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Contest Number",
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
        },
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // This callback customizes the tooltip to show the contest name on hover
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return contestNames[index];
          },
        },
      },
    },
  };

  return (
    <div className="mt-12 xl:mt-0 px-2 w-full max-w-xl mx-auto bg-gray-50 dark:bg-gray-100 shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default RatingGraph;
