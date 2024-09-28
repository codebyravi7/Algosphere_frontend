export const PLATFORM = {
  CODECHEF: "Codechef",
  CODEFORCES: "Codeforces",
  LEETCODE: "Leetcode",
  GEEKSFORGEEKS: "GeeksForGeeks",
  ATCODER: "AtCoder",
  CODINGNINJAS: "CodingNinjas",
};

export class Contest {
  constructor(site, title, startTime, endTime, duration, url) {
    this.site = site;
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.url = url;
  }
}
