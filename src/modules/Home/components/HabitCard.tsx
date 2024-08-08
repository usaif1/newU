// dependencies
import React from "react";
import { Link } from "react-router-dom";

// components
import { Divider, Text } from "@/components";

// types
import { Habit } from "@/types";

type HabitCardProps = {
  habit: Habit;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  return (
    <Link
      to={`/activities/add/${habit.id}`}
      className="h-24 border border-gray-200 rounded-md px-4 py-2"
    >
      <div className="flex items-center justify-between">
        <Text weight="text-600" color="complementary">
          {habit.name}
        </Text>
        <Text size="xxs" weight="text-600" className="underline">
          Start tracking
        </Text>
      </div>
      <Divider />
      <Text size="xxs" color="secondary">
        {habit.description}
      </Text>
    </Link>
  );
};

export default HabitCard;
