import React from "react";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const RatingGraph = ({ contestData }) => {
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
        borderColor: "#3b82f6",
        backgroundColor: "#60a5fa",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Contest Number",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return contestNames[index];
          },
          label: (context) => `Rating: ${context.parsed.y}`,
        },
      },
    },
  };

  return (
    <div className="w-full xl:w-2/3 mt-6 xl:mt-0 bg-white rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Rating Progression
      </h2>
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RatingGraph;
