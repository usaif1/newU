// dependencies
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import { Divider, Text } from "@/components";

// store
import { habitsStore, homeStore } from "@/global/stores";

// types
import { HabitInstace, TrackedHabits } from "@/types";

type HabitTrackerCardProps = {
  habitInstance: HabitInstace;
};

const HabitTrackerCard: React.FC<HabitTrackerCardProps> = ({
  habitInstance,
}) => {
  const currentDate = homeStore.use.currentDate();
  const trackedHabits = habitsStore.use.trackedHabits();

  const [todaysHabit, setTodaysHabit] = React.useState<
    TrackedHabits | undefined
  >();

  useEffect(() => {
    const todaysHabits = trackedHabits.filter((trackedHabit) => {
      return trackedHabit.inputDay === currentDate;
    });

    const foundHabit = todaysHabits.find((habit) => {
      return habit.habit_id === habitInstance.habit_id;
    });

    setTodaysHabit(foundHabit);
  }, [currentDate, habitInstance.habit_id, trackedHabits]);

  return (
    <Link
      to="/"
      className="w-full h-16 border border-gray-200 rounded-md px-4 pt-2"
    >
      <div className="flex items-center justify-between">
        <Text color="alternate" weight="text-600" size="xs">
          {habitInstance?.habit?.habit_name}
        </Text>
        <Text
          color="alternate"
          weight="text-500"
          size="xs"
          className="underline"
        >
          Edit
        </Text>
      </div>
      <Divider />

      {todaysHabit?.habit ? (
        todaysHabit?.habit?.habit_valueRequired ? (
          <div>
            <Text size="xs" weight="text-300">
              {todaysHabit?.inputValue} / {todaysHabit?.requiredValue}{" "}
              <span className="text-xs font-light">
                {todaysHabit?.habit?.habit_unit}
              </span>
            </Text>
          </div>
        ) : (
          <div>
            <Text size="xs" weight="text-300">
              Activity completed{" "}
              {todaysHabit?.frequency === "daily" ? "today" : "this week"}?
              <span className="text-xs font-light">
                {" -"}
                {todaysHabit?.is_completed ? "Yes" : "No"}
              </span>
            </Text>
          </div>
        )
      ) : habitInstance?.habit_instance_threshold ? (
        <Text size="xs" weight="text-300">
          0 / {habitInstance?.habit_instance_threshold}{" "}
          {habitInstance?.habit?.habit_unit}
        </Text>
      ) : (
        <Text size="xs" weight="text-300">
          Activity completed{" "}
          {habitInstance?.frequency === "daily" ? "today" : "this week"}?
          <span className="text-xs font-light">
            {" -"}
            No
          </span>
        </Text>
      )}
    </Link>
  );
};

export default HabitTrackerCard;
