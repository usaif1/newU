// dependencies
import { create } from "zustand";

// selector
import createSelectors from "@/utils/selectors";

// types
import { Habit } from "@/types";

type SelectedHabitFrequency = "daily" | "weekly";

// state
type HabitsState = {
  selectedHabit: Habit | undefined;
  selectedHabitFrequency: SelectedHabitFrequency;
};

const HabitsInitialState: HabitsState = {
  selectedHabit: undefined,
  selectedHabitFrequency: "daily",
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
