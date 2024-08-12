/**
 * @module Habit
 * @description This module contains the service file for the Habit module.
 */

// depdencies
import { DateTime } from "luxon";

// store
import { homeStore, habitsStore } from "@/global/stores";

// types
import { HabitInstace, TrackedHabits } from "@/types";
type CreateNewHabitInstanceDailyArgs = {
  dailyHabits: HabitInstace[];
  tracker: TrackedHabits;
};

type GetDailyStreakArgs = {
  date: string;
  habitInstaceId: string;
};

type GetWeeklyStreakArgs = {
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

  public getStreak = (args: GetDailyStreakArgs) => {
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

    // console.log("currenDate", currentDate);
    // console.log("trackedHabits", trackedHabits);
    // console.log("trackedHabitsByDate", trackedHabitsByDate);
    // console.log("currentHabitTracker", currentHabitTracker);
    // console.log("sortedArr", sortedArr);

    // console.log("streak", streak);
    return streak;
  };

  public getWeeklyStreak = (args: GetWeeklyStreakArgs) => {
    const currentDate = homeStore.getState().currentDate;
    const isMonday = this.checkMonday(currentDate);

    const mondaysArr: TrackedHabits[] = [];

    // if !Monday, we do not need to check weekly streak
    // if (!isMonday) return 0;
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

    for (let j = 0; j < sortedArr.length; j++) {
      // debugger;
      const isValueMonday = this.checkMonday(sortedArr[j]?.inputDay);
      if (!isValueMonday) continue;

      let cumulative = 0;

      for (let i = j - 1; i >= Math.max(0, j - 7); i--) {
        console.log("sortedArr[i]", sortedArr[i]);
        if (sortedArr[i].inputDay === currentDate) {
          continue;
        } else {
          cumulative += sortedArr[i].inputValue;
        }
      }

      console.log("cumulative val", cumulative);
      console.log("sortedArr[j]?.requiredValue", sortedArr[j]?.requiredValue);

      if (cumulative >= sortedArr[j]?.requiredValue) {
        mondaysArr.push(sortedArr[j]);
      }
    }

    console.log("mondaysArr", mondaysArr);
    return mondaysArr.length;

    // !working
    // // sort tracked habits in increasing order

    // console.log("sortedArr", sortedArr);

    // const stop = Math.max(0, sortedArr.length - 1 - 7);

    // let mondayCumulative = 0;

    // for (let i = sortedArr.length - 1; i >= stop; i--) {
    //   console.log("sortedArr[i]", sortedArr[i]);
    // if (sortedArr[i].inputDay === currentDate) {
    //   continue;
    // } else {
    //   mondayCumulative += sortedArr[i].inputValue;
    // }
    // }

    // console.log("monday cumulative", mondayCumulative);

    // const foundHabit = sortedArr.find((habit) => {
    //   return habit.inputDay === currentDate;
    // });

    // const foundHabitIndex = sortedArr.findIndex((habit) => {
    //   return (
    //     habit.inputDay === currentDate &&
    //     habit.habitInstance_id === args.habitInstaceId
    //   );
    // });

    // const orginalTrackedHabits = [...sortedArr];

    // orginalTrackedHabits[foundHabitIndex] = {
    //   ...orginalTrackedHabits[foundHabitIndex],
    //   inputValue: 0,
    //   cumulative: mondayCumulative,
    // };

    // console.log("foundHabit monday", foundHabit);

    // const foundMondaysArr = [];

    // if (foundHabit) {
    //   if (mondayCumulative >= foundHabit?.requiredValue) {
    //     foundMondaysArr.push(foundHabit);
    //   }
    // }

    // console.log("mondays length", foundMondaysArr.length);

    // return foundMondaysArr.length;
    // !working

    // step 1 - check all cumulative values at beginning of the day ( Monday )
    // step 2 - get all mondays from the list of tracked habit
    // check streak at each monday

    // if (!isMonday) return 0;

    // // Ensure that we do not go beyond the start of the array
    // const stop = Math.max(0, sortedArr.length - 1 - 7);

    // let inputValueSum = 0;

    // for (let i = sortedArr.length - 1; i >= stop; i--) {
    //   if (sortedArr[i]?.inputDay === currentDate) {
    //     continue;
    //   }

    //   inputValueSum += sortedArr[i]?.inputValue;
    // }

    // return inputValueSum;

    // const weeks = this.groupByWeek(data);
    // let streakCount = 0;

    // Object.keys(weeks).forEach((weekStart, index, weekKeys) => {
    //   const weekEntries = weeks[weekStart];

    //   // Calculate the total input value for the week
    //   const weekTotal = weekEntries.reduce(
    //     (sum, entry) => sum + entry.inputValue,
    //     0
    //   );

    //   // If the week total meets the weekly threshold
    //   if (weekTotal >= weeklyThreshold) {
    //     // Ensure that the streak is counted on the next Monday (start of next week)
    //     if (index + 1 < weekKeys.length) {
    //       const nextWeekStart = DateTime.fromISO(weekKeys[index + 1]);
    //       const nextMonday = nextWeekStart.startOf("week").plus({ days: 1 });

    //       // Only count the streak once per week
    //       streakCount++;

    //       // Log the streak count date for clarity
    //       console.log("Streak counted on:", nextMonday.toISODate());
    //     }
    //   }
    // });

    // return streakCount;
  };

  private checkMonday = (dateString: string): boolean => {
    const date = DateTime.fromISO(dateString);
    return date.weekday === 1;
  };
}

const habitService = HabitService.getInstance();

export default habitService;
