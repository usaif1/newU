// dependencies
import { create } from "zustand";

// selector
import createSelectors from "@/utils/selectors";

// state
type HomeState = {
  currentDate: string; // current date selected by the user
};

const HabitsInitialState: HomeState = {
  currentDate: "",
};

// actions
type HomeActions = {
  resetHomeStore: () => void;
};

const useHabitsStore = create<HomeState & HomeActions>((set) => ({
  ...HabitsInitialState,

  // reset store
  resetHomeStore: () => set(HabitsInitialState),
}));

export default createSelectors(useHabitsStore);
