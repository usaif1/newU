// dependencies
import React from "react";

// components
import { Divider, Text } from "@/components";

// types
import { HabitInstace } from "@/types";

type HabitCardProps = {
  habitInstance: HabitInstace;
};

const HabitCard: React.FC<HabitCardProps> = ({ habitInstance }) => {
  return (
    <div className="h-24 border border-gray-200 rounded-md px-4 py-2">
      <div className="flex items-center justify-between">
        <Text weight="text-600" color="complementary">
          {habitInstance.habit?.habit_name}
        </Text>
      </div>
      <Divider />
      <Text size="xxs" color="secondary">
        {habitInstance.habit?.habit_description}
      </Text>
    </div>
  );
};

export default HabitCard;
