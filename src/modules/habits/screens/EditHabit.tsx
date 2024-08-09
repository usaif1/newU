// dependencies
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// store
import { habitsStore, homeStore } from "@/global/stores";

// components
import { Divider, Heading, ScreenWrapper, Text } from "@/components";

// types
import { Habit, HabitInstace, TrackedHabits } from "@/types";
import habitService from "../service";

const EditActivity: React.FC = () => {
  const { habitinstanceid } = useParams();

  const currentDate = homeStore.use.currentDate();
  const trackedHabits = habitsStore.use.trackedHabits();
  const dailyHabitsInstances = habitsStore.use.dailyHabitsInstances();

  const [habitInstance, setHabitInstance] = useState<HabitInstace | null>();

  const [value, setValue] = useState<number>(0);

  const onClick = useCallback((type: "add" | "subtract") => {
    if (type === "add") {
      setValue((prev) => {
        return prev + 1;
      });
    } else {
      setValue((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }
  }, []);

  useEffect(() => {
    const foundHabitInstance = dailyHabitsInstances.find((habit) => {
      return habit.habit_instance_id === habitinstanceid;
    });

    const dateFilteredHabits = trackedHabits.filter((habit) => {
      return habit.inputDay === currentDate;
    });

    const foundHabit = dateFilteredHabits.find((habit) => {
      return habit.habitInstance_id === habitinstanceid;
    });

    if (!foundHabit) {
      const origingalTracker = [...trackedHabits];

      const tracker: TrackedHabits = {
        frequency: foundHabitInstance?.frequency as "daily" | "weekly",
        habit: foundHabitInstance?.habit as Habit,
        habit_id: foundHabitInstance?.habit_id || "",
        habitInstance: foundHabitInstance as HabitInstace,
        habitInstance_id: foundHabitInstance?.habit_instance_id || "",
        inputDay: currentDate,
        inputValue: 0,
        is_completed: false,
        requiredValue: Number(foundHabitInstance?.habit_instance_threshold),
        streak: 0,
        tracker_id: `${foundHabitInstance?.habit_id}${foundHabitInstance?.frequency}${currentDate}`,
      };

      origingalTracker.push(tracker);

      habitService.createNewHabitTracker(origingalTracker);
    }

    setHabitInstance(foundHabitInstance);
    setValue(foundHabit?.inputValue ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value) {
      const dateFilteredHabits = trackedHabits.filter((habit) => {
        return habit.inputDay === currentDate;
      });

      const foundHabit = dateFilteredHabits.find((habit) => {
        return habit.habitInstance_id === habitinstanceid;
      });

      if (foundHabit) {
        const indexOfHabitTracker = trackedHabits.findIndex((habit) => {
          return (
            habit.habitInstance_id === foundHabit?.habitInstance_id &&
            habit.inputDay === currentDate
          );
        });

        const orginalTrackedHabits = [...trackedHabits];

        orginalTrackedHabits[indexOfHabitTracker] = {
          ...orginalTrackedHabits[indexOfHabitTracker],
          inputValue: value,
          is_completed: value >= foundHabit?.requiredValue,
        };

        habitsStore.setState((state) => ({
          ...state,
          trackedHabits: orginalTrackedHabits,
        }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  console.log("trackedHabits", trackedHabits);

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Edit Habit
      </Heading>
      <Divider height="1rem" />
      <div className="flex justify-end">
        <Text size="xs" color="secondary">
          {" "}
          Date: {currentDate}
        </Text>
      </div>
      <Divider height="2rem" />
      <div>
        <Text>{habitInstance?.habit?.habit_name}</Text>
        <Divider height="1rem" />
        {habitInstance?.habit?.habit_valueRequired ? (
          <div className="flex items-end justify-between">
            <div className="flex gap-x-2">
              <Text
                className="w-32 bg-transparent"
                color="secondary"
                weight="text-400"
              >
                {value} / {habitInstance?.habit_instance_threshold}{" "}
                <span className="text-secondary text-xs font-normal">
                  {habitInstance?.habit?.habit_unit}
                </span>
              </Text>
              <div className="flex gap-x-2">
                <button
                  onClick={() => onClick("subtract")}
                  className="w-6 h-6 border border-slate rounded-full flex items-center justify-center text-secondary"
                >
                  -
                </button>
                <button
                  onClick={() => onClick("add")}
                  className="w-6 h-6 border border-slate rounded-full flex items-center justify-center text-secondary"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>radio btn</div>
        )}
      </div>
    </ScreenWrapper>
  );
};

export default EditActivity;
