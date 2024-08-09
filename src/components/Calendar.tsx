// dependencies
import React from "react";
import { DateTime } from "luxon";

// components
import { Text } from "@/components";

// store
import { homeStore } from "@/global/stores";

// utils
import { dateList } from "@/utils/general";

const Calendar: React.FC = () => {
  const currentDate = homeStore.use.currentDate();

  const onClick = (date: string) => {
    homeStore.setState((state) => ({
      ...state,
      currentDate: date,
    }));
  };

  return (
    <div>
      <div className="bg-offwhite pl-2">
        <Text color="dark">Choose a day</Text>
      </div>
      <div className="w-full grid grid-cols-5">
        {dateList.map((date) => (
          <button
            onClick={() => onClick(date.date)}
            className={`border border-red-100 p-0.5 flex flex-col items-center ${
              currentDate === date.date ? "bg-yellow" : ""
            }`}
            key={date.date}
          >
            <Text
              size="xxs"
              weight="text-400"
              color={currentDate === date.date ? "dark" : "primary"}
            >
              {date.day.substring(0, 3)}
            </Text>
            <div>
              <Text
                size="xxs"
                weight="text-400"
                color={currentDate === date.date ? "dark" : "primary"}
              >
                {DateTime.fromISO(date.date).toFormat("LLL yy")}
              </Text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
