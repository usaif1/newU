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
};

const HabitsInitialState: HabitsState = {
  // new habit instances
  dailyHabitsInstances: [],
  weeklyHabitsInstances: [],

  //tracking
  trackedHabits: [],
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
