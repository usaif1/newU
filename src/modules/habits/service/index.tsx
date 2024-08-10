/**
 * @module Habit
 * @description This module contains the service file for the Habit module.
 */

// dependencies

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

    let streak = 0;

    const startIndex = currentHabitTracker.length - 1;

    for (let i = startIndex; i >= 0; i--) {
      console.log("prev habit", currentHabitTracker[i - 1]);
      if (currentHabitTracker[i - 1]?.is_completed) {
        streak += 1;
      } else {
        streak = 0;
      }
    }

    // currentHabitTracker.forEach((habit) => {
    //   if (habit.is_completed) {
    //     streak += 1;
    //   } else {
    //     streak = 0;
    //   }
    // });

    habitsStore.setState((state) => ({
      ...state,
      dailyStreak: streak,
    }));

    console.log("currenDate", currentDate);
    console.log("trackedHabits", trackedHabits);
    console.log("trackedHabitsByDate", trackedHabitsByDate);
    console.log("currentHabitTracker", currentHabitTracker);
  };
}

const habitService = HabitService.getInstance();

export default habitService;
