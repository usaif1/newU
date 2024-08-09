// types
import { Habit } from "@/types";

export const habitList: Habit[] = [
  {
    habit_id: "hydration",
    habit_name: "Drink Water",
    habit_description:
      "Drink at least 8 glasses of water each day to stay hydrated.",
    habit_valueRequired: true,
    habit_valueText: "How much water will you drink?",
    habit_unit: "glasses",
  },

  {
    habit_id: "meditation",
    habit_name: "Meditation",
    habit_description:
      "Practice meditation for 10-15 minutes to reduce stress and increase focus.",
    habit_valueRequired: false,
  },

  {
    habit_id: "exercise",
    habit_name: "Exercise",
    habit_description:
      "Engage in physical activity for at least 30 minutes to improve overall health.",
    habit_valueRequired: true,
    habit_valueText: "How many hours will you exercise?",
    habit_unit: "hours",
  },

  {
    habit_id: "reading",
    habit_name: "Daily Reading",
    habit_description:
      "Read for at least 10 pages a day to expand your knowledge and improve focus.",
    habit_valueRequired: true,
    habit_valueText: "How many pages will you read?",
    habit_unit: "pages",
  },

  {
    habit_id: "walking",
    habit_name: "Walking",
    habit_description:
      "Connect with nature by spending time outdoors, taking walks in parks",
    habit_valueRequired: false,
  },
];
