import { DateTime } from "luxon";

function generateFormattedDates(): { date: string; day: string }[] {
  const dates: { date: string; day: string }[] = [];
  const today = DateTime.local();

  // Generate dates for the week before today
  for (let i = 7; i > 0; i--) {
    const pastDate = today.minus({ days: i });
    dates.push({
      date: pastDate.toFormat("yyyy-MM-dd"),
      day: pastDate.toFormat("cccc"),
    });
  }

  // Generate dates for the 23 days after today
  for (let i = 1; i <= 23; i++) {
    const futureDate = today.plus({ days: i });
    dates.push({
      date: futureDate.toFormat("yyyy-MM-dd"),
      day: futureDate.toFormat("cccc"),
    });
  }

  return dates;
}

export const dateList = generateFormattedDates();
