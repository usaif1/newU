export type Habit = {
  id: string;
  name: string;
  description: string;
  valueRequired: boolean;
  valueText?: string;
  unit?: string;
};
