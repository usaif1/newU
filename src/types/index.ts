export type Habit = {
  habit_id: string;
  habit_name: string;
  habit_description: string;
  habit_valueRequired: boolean;
  habit_valueText?: string;
  habit_unit?: string;
};

/**
 * Habit instance type
 * When we start tracking a habit we create an instance of that habit
 */
export type HabitInstace = {
  habit: Habit;
  habit_id: string; //unique id for each habit
  habit_instance_id: string; //unique id for each habit instance
  habit_instance_threshold: string; //threshold value for the to meet the streak
  created_on: string; //date when the habit instance was created
  is_active: boolean; //flag to check if the habit instance is active
  frequency: "daily" | "weekly";
};

export type TrackedHabits = {
  tracker_id: string;
  habitInstance: HabitInstace;
  habitInstance_id: string;
  habit: Habit;
  habit_id: string;
  inputDay: string;
  requiredValue: number;
  inputValue: number;
  frequency: "daily" | "weekly";
  streak: number;
  is_completed: boolean;
  cumulative: number;
};
