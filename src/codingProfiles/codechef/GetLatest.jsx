import React from "react";

const getLatestDateString = (heatMap) => {
  const latestEntry = heatMap?.reduce((latest, current) => {
    return new Date(latest?.date) > new Date(current.date) ? latest : current;
  });
  const date = new Date(latestEntry.date);
  const options = { day: "numeric", month: "short", year: "numeric" };

  return date.toLocaleDateString("en-GB", options);
};

const LastActive = ({heatMap}) => {
  // Get the latest date as a string
  const latestDateString = getLatestDateString(heatMap);

  return (
    <div>
      <h1>Latest Date in the HeatMap:</h1>
      <p>{latestDateString}</p> {/* Display the latest date */}
    </div>
  );
};

export default LastActive;
