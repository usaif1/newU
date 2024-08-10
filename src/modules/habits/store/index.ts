// dependencies
import { create } from "zustand";

// selector
import createSelectors from "@/utils/selectors";

// types
import { HabitInstace, TrackedHabits } from "@/types";

// state
type HabitsState = {
  // new habit instances
  dailyHabitsInstances: HabitInstace[];
  weeklyHabitsInstances: HabitInstace[];

  //tracking
  trackedHabits: TrackedHabits[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dailyStreak: number;
};

const HabitsInitialState: HabitsState = {
  // new habit instances
  dailyHabitsInstances: [],
  weeklyHabitsInstances: [],

  //tracking
  trackedHabits: [],

  // streaks
  dailyStreak: 0,
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
