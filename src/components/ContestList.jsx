import { useState, useMemo } from "react";
import Card from "./Card";
import Loader from "./Loader";
import FilterMenu from "./FilterMenu";

const ContestList = ({ loading, error, contests }) => {
  const [filter, setFilter] = useState("All");

  const now = new Date();
  const next24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const next7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const filterContests = (contests) => {
    return contests.filter((contest) => {
      const startTime = new Date(contest.startTime);
      const endTime = new Date(contest.endTime);

      // Check for invalid dates
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        console.warn(`Invalid contest dates for contest: ${contest.url}`);
        return false; // Exclude invalid contests
      }

      switch (filter) {
        case "Ongoing":
          return startTime <= now && endTime >= now;
        case "In next 24hrs":
          return startTime <= next24hrs && startTime >= now;
        case "In next 7days":
          return startTime <= next7days && startTime >= now;
        default:
          return true; // Show all contests if no filter is selected
      }
    });
  };

  const filteredContests = useMemo(
    () => filterContests(contests),
    [contests, filter]
  );

  return (
    <div className="pt-20 flex flex-col p-4 gap-4 w-full min-h-screen">
      <div className="flex flex-col justify-between items-center mb-4 gap-4">
        {loading && (
          <span className="flex flex-row items-center justify-center font-semibold text-sm text-gray-800 dark:text-gray-200 gap-2 mb-2">
            <p>Refreshing Contests</p>
            <Loader />
          </span>
        )}
        {error && contests.length === 0 && (
          <span className="flex flex-col items-center justify-center font-semibold text-sm text-red-500 dark:text-red-400 text-center gap-2 mb-2">
            <p>Unable to refresh contests!</p>
            <p>Please check your internet connection.</p>
          </span>
        )}
        <FilterMenu curFilter={filter} updateFilter={setFilter} />
      </div>

      {filteredContests.length > 0 ? (
        <>
          <h2 className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-left">
            {filteredContests.length} contest
            {filteredContests.length > 1 && "s"} found
          </h2>
          {filteredContests.map((contest) => (
            <Card contest={contest} key={contest.url} />
          ))}
        </>
      ) : (
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-center">
          {loading ? "Loading contests..." : "Oops! Looks like no contests!"}
        </h3>
      )}
    </div>
  );
};

export default ContestList;
