import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    contestId: 1851,
    contestName: "Codeforces Round 888 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 13567,
    ratingUpdateTimeSeconds: 1690303800,
    oldRating: 0,
    newRating: 393,
  },
  {
    contestId: 1867,
    contestName: "Codeforces Round 897 (Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 8885,
    ratingUpdateTimeSeconds: 1694450100,
    oldRating: 393,
    newRating: 661,
  },
  {
    contestId: 1873,
    contestName: "Codeforces Round 898 (Div. 4)",
    handle: "codeforces_ravi_7",
    rank: 10864,
    ratingUpdateTimeSeconds: 1695315900,
    oldRating: 661,
    newRating: 852,
  },
  {
    contestId: 1878,
    contestName: "Codeforces Round 900 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 11117,
    ratingUpdateTimeSeconds: 1695747000,
    oldRating: 852,
    newRating: 967,
  },
  {
    contestId: 1886,
    contestName: "Educational Codeforces Round 156 (Rated for Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 7486,
    ratingUpdateTimeSeconds: 1696869300,
    oldRating: 967,
    newRating: 1064,
  },
  {
    contestId: 1925,
    contestName: "Codeforces Round 921 (Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 13113,
    ratingUpdateTimeSeconds: 1706373900,
    oldRating: 1064,
    newRating: 1048,
  },
  {
    contestId: 1927,
    contestName: "Codeforces Round 923 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 11663,
    ratingUpdateTimeSeconds: 1707238800,
    oldRating: 1048,
    newRating: 1056,
  },
  {
    contestId: 1931,
    contestName: "Codeforces Round 925 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 9398,
    ratingUpdateTimeSeconds: 1707843000,
    oldRating: 1056,
    newRating: 1079,
  },
  {
    contestId: 1930,
    contestName: "think-cell Round 1",
    handle: "codeforces_ravi_7",
    rank: 5873,
    ratingUpdateTimeSeconds: 1708191300,
    oldRating: 1079,
    newRating: 1112,
  },
  {
    contestId: 1926,
    contestName: "Codeforces Round 928 (Div. 4)",
    handle: "codeforces_ravi_7",
    rank: 6313,
    ratingUpdateTimeSeconds: 1708361400,
    oldRating: 1112,
    newRating: 1139,
  },
  {
    contestId: 1941,
    contestName: "Codeforces Round 933 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 7595,
    ratingUpdateTimeSeconds: 1710175800,
    oldRating: 1139,
    newRating: 1158,
  },
  {
    contestId: 1948,
    contestName: "Educational Codeforces Round 163 (Rated for Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 10687,
    ratingUpdateTimeSeconds: 1710520500,
    oldRating: 1158,
    newRating: 1131,
  },
  {
    contestId: 1945,
    contestName: "Codeforces Round 935 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 4986,
    ratingUpdateTimeSeconds: 1710843600,
    oldRating: 1131,
    newRating: 1135,
  },
  {
    contestId: 1946,
    contestName: "Codeforces Round 936 (Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 9373,
    ratingUpdateTimeSeconds: 1711125300,
    oldRating: 1135,
    newRating: 1103,
  },
  {
    contestId: 1950,
    contestName: "Codeforces Round 937 (Div. 4)",
    handle: "codeforces_ravi_7",
    rank: 5734,
    ratingUpdateTimeSeconds: 1711645200,
    oldRating: 1103,
    newRating: 1145,
  },
  {
    contestId: 1954,
    contestName: "Educational Codeforces Round 164 (Rated for Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 8059,
    ratingUpdateTimeSeconds: 1712939700,
    oldRating: 1145,
    newRating: 1146,
  },
  {
    contestId: 1957,
    contestName: "Codeforces Round 940 (Div. 2) and CodeCraft-23",
    handle: "codeforces_ravi_7",
    rank: 10308,
    ratingUpdateTimeSeconds: 1713718200,
    oldRating: 1146,
    newRating: 1079,
  },
  {
    contestId: 1971,
    contestName: "Codeforces Round 944 (Div. 4)",
    handle: "codeforces_ravi_7",
    rank: 4875,
    ratingUpdateTimeSeconds: 1715359800,
    oldRating: 1079,
    newRating: 1125,
  },
  {
    contestId: 1996,
    contestName: "Codeforces Round 962 (Div. 3)",
    handle: "codeforces_ravi_7",
    rank: 15268,
    ratingUpdateTimeSeconds: 1722013500,
    oldRating: 1125,
    newRating: 1074,
  },
  {
    contestId: 1993,
    contestName: "Codeforces Round 963 (Div. 2)",
    handle: "codeforces_ravi_7",
    rank: 6120,
    ratingUpdateTimeSeconds: 1722789300,
    oldRating: 1074,
    newRating: 1153,
  },
  {
    contestId: 1999,
    contestName: "Codeforces Round 964 (Div. 4)",
    handle: "codeforces_ravi_7",
    rank: 15706,
    ratingUpdateTimeSeconds: 1722963600,
    oldRating: 1153,
    newRating: 1100,
  },
];

const CodeforceRatingCard = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const maxRating = Math.max(...data.map((item) => item.newRating));

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000)?.toLocaleDateString();
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const contest = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-bold">{contest.contestName}</p>
          <p>Date: {formatDate(contest.ratingUpdateTimeSeconds)}</p>
          <p>Rank: {contest.rank}</p>
          <p>Old Rating: {contest.oldRating}</p>
          <p>New Rating: {contest.newRating}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">Codeforces Rating History</h2>
        <p className="text-lg">Max Rating: {maxRating}</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="contestId" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="newRating"
              stroke="#8884d8"
              activeDot={{
                r: 8,
                onClick: (event, payload) => setHoveredPoint(payload),
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {hoveredPoint && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="font-bold">{hoveredPoint.contestName}</h3>
          <p>Contest ID: {hoveredPoint.contestId}</p>
          <p>Date: {formatDate(hoveredPoint.ratingUpdateTimeSeconds)}</p>
          <p>Rank: {hoveredPoint.rank}</p>
          <p>Old Rating: {hoveredPoint.oldRating}</p>
          <p>New Rating: {hoveredPoint.newRating}</p>
        </div>
      )}
    </div>
  );
};

export default CodeforceRatingCard;
