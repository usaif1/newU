// dependencies
import React from "react";

// components
import { Text } from "@/components";

// utils
import { dateList } from "@/utils/general";

const Calendar: React.FC = () => {
  return (
    <div>
      <Text className="bg-red-400">Choose a day</Text>
      <div className="flex">
        {dateList.map((date) => (
          <button key={date.date}>
            <Text>{date.day}</Text>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
