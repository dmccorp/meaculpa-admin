import moment from "moment";

export function timeLeft(time) {
  const duration = moment.duration(time - Date.now());
  return `${duration.hours()}:${duration
    .minutes()
    .toString()
    .padStart(2, "0")}:${duration.seconds().toString().padStart(2, "0")}`;
}
