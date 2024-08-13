// dependencies
import { create } from "zustand";

// selector
import createSelectors from "@/utils/selectors";

// types
import { HabitInstace, TrackedHabits } from "@/types";

// state
type HabitsState = {
  // new habit instances
  dailyHabitsInstances: HabitInstace[]; // instance of a daily habit
  weeklyHabitsInstances: HabitInstace[]; // instance of a weekly habit ( not currently used )

  //tracking
  trackedHabits: TrackedHabits[]; // tracker for the habit instances. keeps daily track of the habit instances 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dailyStreak: any[];
};

const HabitsInitialState: HabitsState = {
  // new habit instances
  dailyHabitsInstances: [],
  weeklyHabitsInstances: [],

  //tracking
  trackedHabits: [],

  // streaks
  dailyStreak: [],
};

// actions
type HabitsActions = {
  resetHabitsStore: () => void;
};

const useHabitsStore = create<HabitsState & HabitsActions>((set) => ({
  ...HabitsInitialState,

  // reset store
  resetHabitsStore: () => set(HabitsInitialState),
}));

export default createSelectors(useHabitsStore);
