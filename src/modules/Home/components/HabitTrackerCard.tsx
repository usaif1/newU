/**
 * The HabitTrackerCard component is responsible for tracking and displaying the progress of a habit instance.
 * It manages the state of the habit tracker and calculates streaks based on the current date.
 */

// dependencies
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import { Divider, Text } from "@/components";

// store
import { habitsStore, homeStore } from "@/global/stores";

// services
import { HabitInstace, TrackedHabits } from "@/types";

// types
import habitService from "@/modules/habits/service";

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
  const [dailyStreak, setDailyStreak] = useState<number>(0);
  const [weeklyStreak, setWeeklyStreak] = useState<number>(0);

  /**
   * checks if the habit instance is tracked for the current day
   * if not, creates a new tracker for the habit instance ( duplicate functionality in EditHabitForm screen )
   * updates the state with the new tracker
   */
  useEffect(() => {
    const todaysHabits = trackedHabits.filter((trackedHabit) => {
      return trackedHabit.inputDay === currentDate;
    });

    const foundHabit = todaysHabits.find((habit) => {
      return habit.habit_id === habitInstance.habit_id;
    });

    if (!foundHabit) {
      const tracker: TrackedHabits = {
        frequency: habitInstance?.frequency,
        habit: habitInstance?.habit,
        habit_id: habitInstance?.habit_id || "",
        habitInstance: habitInstance,
        habitInstance_id: habitInstance.habit_instance_id,
        inputDay: currentDate,
        inputValue: 0,
        is_completed: false,
        requiredValue: Number(habitInstance?.habit_instance_threshold),
        streak: 0,
        tracker_id: `${habitInstance?.habit_id}${habitInstance?.frequency}${currentDate}`,
        cumulative: trackedHabits[trackedHabits.length - 1]?.cumulative || 0,
      };

      habitsStore.setState((state) => ({
        ...state,
        trackedHabits: [...state.trackedHabits, tracker],
      }));

      setTodaysHabit(tracker);
    } else {
      setTodaysHabit(foundHabit);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, trackedHabits]);

  /**
   * calculates the daily and weekly streak for the habit instance
   */
  useEffect(() => {
    const calculatedStreak = habitService.getStreak({
      date: currentDate,
      habitInstaceId: habitInstance.habit_instance_id,
    });

    setDailyStreak(calculatedStreak);

    /**
     * this is done because the habit instance threshold is an empty string initially
     * need to improve threshold handling logic
     */
    if (
      habitInstance.habit_instance_threshold &&
      parseInt(habitInstance.habit_instance_threshold)
    ) {
      const weeklyStreak = habitService.getWeeklyStreak({
        date: currentDate,
        habitInstaceId: habitInstance.habit_instance_id,
      });

      setWeeklyStreak(weeklyStreak);
    } else {
      const weeklyStreak = habitService.getWeeklyStreakBool({
        date: currentDate,
        habitInstaceId: habitInstance.habit_instance_id,
      });

      setWeeklyStreak(weeklyStreak);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <Link
      to={`/habits/edit/${habitInstance?.habit_instance_id}`}
      className="w-full h-16 border border-gray-200 rounded-md px-4 pt-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Text color="alternate" weight="text-600" size="xs">
            {habitInstance?.habit?.habit_name}
          </Text>
          <Text color="alternate" weight="text-600" size="xs">
            {habitInstance?.frequency === "daily"
              ? `(daily streak -> ${dailyStreak})`
              : `(weekly streak -> ${weeklyStreak})`}
          </Text>
        </div>
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
