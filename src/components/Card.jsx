import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { BellPlus, CircleCheckBig } from "lucide-react";

const STATUS = {
  ongoing: "Ongoing",
  ended: "Ended",
  yetToStart: "Yet To Start",
};

const platformLogos = {
  CodeChef: "images/platforms/codechef.jpeg",
  LEETCODE: "images/platforms/leetcode.png",
  Codeforces: "images/platforms/codeforces.png",
  AtCoder: "images/platforms/atcoder.png",
  GEEKSFORGEEKS: "images/platforms/geeksforgeeks.png",
  CODINGNINJAS: "images/platforms/codingninja.jpg",
};

const Card = ({ contest }) => {
  const { sendNotification } = useAuthContext();
  const startDate = new Date(contest?.startTime);
  const endDate = new Date(contest?.endTime);
  const logoUrl = platformLogos[contest?.site] || "images/default-logo.png";

  const [curTime, setCurTime] = useState(new Date());
  const [notify, setNotify] = useState(false);

  let currentStatus = STATUS.yetToStart;
  if (curTime > endDate) currentStatus = STATUS.ended;
  else if (curTime >= startDate && curTime <= endDate)
    currentStatus = STATUS.ongoing;

  const handleNotifyClick = async (title, startTime, link) => {
    setNotify(true);
    await sendNotification(title, startTime, link);
  };
  return (
    <div className="flex p-1 border-b-4 border-x-2 rounded-b-3xl">
      <a
        href={contest?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col sm:flex-row items-center w-full"
      >
        <img
          className="object-cover w-32 h-16 sm:h-24 p-2 m-2"
          src={logoUrl}
          alt={contest?.site}
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <h5 className="mb-1 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {`${contest?.site} - ${contest?.title}`}
          </h5>

          {/* Status Indicator */}
          {currentStatus === STATUS.ended && (
            <StatusIndicator color="text-red-600" status={STATUS.ended} />
          )}
          {currentStatus === STATUS.ongoing && (
            <StatusIndicator color="text-green-500" status={STATUS.ongoing} />
          )}
          {currentStatus === STATUS.yetToStart && (
            <div className="mb-2 flex items-center justify-between gap-1">
              <span className="flex gap-1 items-center">
                <i className="fa-solid fa-circle-dot"></i>
                <p className="mb-1 text-sm font-normal text-gray-600 dark:text-gray-200">
                  {getRemainingTime(contest?.startTime, curTime)}
                </p>
              </span>
            </div>
          )}

          {/* Start & End Times */}
          <p className="mb-1 text-sm sm:text-md font-normal text-gray-700 dark:text-gray-100">
            {`Starts at ${formatDate(startDate)}`}
          </p>
          <p className="mb-2 text-sm sm:text-md font-normal text-gray-700 dark:text-gray-100">
            {`Ends at ${formatDate(endDate)}`}
          </p>
          <p className="mb-2 text-sm sm:text-md font-normal text-gray-700 dark:text-gray-100">
            {`Duration (in mins): ${contest?.duration}`}
          </p>
        </div>
      </a>

      {/* Notify Me Button */}
      <button
        onClick={() =>
          handleNotifyClick(contest?.title, contest?.startTime, contest?.url)
        }
        className={`h-14 my-auto mr-4 px-4 py-2 ${
          notify ? "bg-green-400" : "bg-gray-700"
        } text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center`}
      >
        {!notify ? <BellPlus className="w-5 h-5" /> : <CircleCheckBig />}
      </button>
    </div>
  );
};

// Helper component for status display
const StatusIndicator = ({ color, status }) => (
  <div className="mb-2 flex items-center justify-start gap-1">
    <i className={`fa-solid fa-circle-dot ${color}`}></i>
    <p className={`mb-1 text-sm font-normal ${color}`}>{status}</p>
  </div>
);

// Format time remaining before contest starts
const getRemainingTime = (startTime, curTime) => {
  const remainingTimeSec = (new Date(startTime) - new Date(curTime)) / 1000;
  const days = Math.floor(remainingTimeSec / (60 * 60 * 24));
  const hours = Math.floor((remainingTimeSec / (60 * 60)) % 24);
  const mins = Math.floor((remainingTimeSec / 60) % 60);
  const sec = Math.floor(remainingTimeSec % 60);

  if (days >= 1)
    return `Starts in ${days} ${days === 1 ? "day" : "days"}, ${hours} hrs`;
  if (hours >= 1) return `Starts in ${hours} hrs, ${mins} mins`;
  return `Starts in ${mins} mins, ${sec} secs`;
};

// Format date and time display
const formatDate = (date) =>
  `${date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })}, ${date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })}`;

export default Card;
