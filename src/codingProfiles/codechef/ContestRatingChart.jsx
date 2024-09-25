import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContestRatingChart = ({ ratingData }) => {
  // Extracting date and rating from the data
  const labels = ratingData.map(
    (contest) => `${contest.getyear}-${contest.getmonth}-${contest.getday}`
  );
  const ratings = ratingData.map((contest) => contest.rating);

  const data = {
    labels,
    datasets: [
      {
        label: "Contest Ratings",
        data: ratings,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3, // smooth curve
        pointRadius: 3, // point size
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // point color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(0, 0, 0, 0.7)", // legend text color
        },
      },
      title: {
        display: true,
        text: "CodeChef Contest Rating Progression",
        color: "rgba(0, 0, 0, 0.8)", // title text color
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // grid color
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // grid color
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ContestRatingChart;
