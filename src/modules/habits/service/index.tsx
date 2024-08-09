/**
 * @module Habit
 * @description This module contains the service file for the Habit module.
 */

// dependencies

// store
import habitsStore from "../store";

// types
import { HabitInstace, TrackedHabits } from "@/types";

type CreateNewHabitInstanceDailyArgs = {
  dailyHabits: HabitInstace[];
  tracker: TrackedHabits;
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
}

const habitService = HabitService.getInstance();

export default habitService;
