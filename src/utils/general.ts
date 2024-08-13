import { DateTime } from "luxon";

function generateFormattedDates() {
  const dates = [];
  const start = DateTime.local(2024, 8, 1); // August 1st, 2024

  for (let i = 0; i < 30; i++) {
    const date = start.plus({ days: i });
    const dateObject = {
      date: date.toFormat("yyyy-MM-dd"),
      day: date.toFormat("dd LLL yyyy"), // '01 Aug 2024'
    };
    dates.push(dateObject);
  }

  return dates;
}

export const dateList = generateFormattedDates();
