/**
 * @module Habit
 * @description This module contains the service file for the Habit module.
 */

// dependencies
import { DateTime } from "luxon";

// store
import { homeStore, habitsStore } from "@/global/stores";

// types
import { HabitInstace, TrackedHabits } from "@/types";

type CreateNewHabitInstanceDailyArgs = {
  dailyHabits: HabitInstace[];
  tracker: TrackedHabits;
};

type GetStreakArgs = {
  date: string;
  habitInstaceId: string;
};

/**
 * @class HabitService
 * @description This class represents the service for the Habit module.
 */
class HabitService {
  private static instance: HabitService;

  public static getInstance(): HabitService {
    if (!HabitService.instance) {
      HabitService.instance = new HabitService();
    }
    return HabitService.instance;
  }

  /**
   * function to create a new habit instance and create a tracker for it
   * @param args : CreateNewHabitInstanceDailyArgs
   */
  public createNewHabitInstanceDaily = (
    args: CreateNewHabitInstanceDailyArgs
  ) => {
    try {
      habitsStore.setState((state) => ({
        ...state,
        dailyHabitsInstances: args.dailyHabits,
        trackedHabits: [...state.trackedHabits, args.tracker],
      }));
    } catch (err) {
      throw new Error("Failed to add new habit instance");
    }
  };

  public createNewHabitTracker = (tracker: TrackedHabits[]) => {
    try {
      habitsStore.setState((state) => ({
        ...state,
        trackedHabits: tracker,
      }));
    } catch (err) {
      throw new Error("Failed to add new habit tracker");
    }
  };

  public getStreak = (args: GetStreakArgs) => {
    const currentDate = homeStore.getState().currentDate;
    const trackedHabits = habitsStore.getState().trackedHabits;
    const trackedHabitsByDate = trackedHabits.filter((trackedHabit) => {
      return trackedHabit.inputDay <= args.date;
    });
    const currentHabitTracker = trackedHabitsByDate.filter((habit) => {
      return habit.habitInstance_id === args.habitInstaceId;
    });
    const sortedArr = currentHabitTracker.sort((a, b) => {
      return Date.parse(a.inputDay) - Date.parse(b.inputDay);
    });

    let streak = 0;

    for (let i = sortedArr.length - 1; i >= 0; i--) {
      if (sortedArr[i]?.inputDay === currentDate) {
        continue;
      }

      if (sortedArr[i]?.is_completed) {
        streak++;
      } else {
        break;
      }
    }

    console.log("currenDate", currentDate);
    console.log("trackedHabits", trackedHabits);
    console.log("trackedHabitsByDate", trackedHabitsByDate);
    console.log("currentHabitTracker", currentHabitTracker);
    console.log("sortedArr", sortedArr);

    console.log("streak", streak);
    return streak;
  };
}

const habitService = HabitService.getInstance();

export default habitService;
