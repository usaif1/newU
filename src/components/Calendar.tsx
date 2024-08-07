// dependencies
import React from "react";
import { DateTime } from "luxon";

// components
import { Text } from "@/components";

// utils
import { dateList } from "@/utils/general";

const Calendar: React.FC = () => {
  return (
    <div>
      <Text className="bg-red-400">Choose a day</Text>
      <div className="flex flex-wrap">
        {dateList.map((date) => (
          <button className="w-20 border border-red-100" key={date.date}>
            <Text size="xxs" weight="text-400">
              {date.day.substring(0, 3)}
            </Text>
            <div>
              <Text size="xs" weight="text-400">
                {/* 8 Aug 24 */}
                {DateTime.fromISO(date.date).toFormat("dd LLL yy")}
              </Text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
