// types
import { Habit } from "@/types";

export const habitList: Habit[] = [
  {
    id: "hydration",
    name: "Drink Water",
    description: "Drink at least 8 glasses of water each day to stay hydrated.",
    valueRequired: true,
  },

  {
    id: "meditation",
    name: "Meditation",
    description:
      "Practice meditation for 10-15 minutes to reduce stress and increase focus.",
    valueRequired: false,
  },

  {
    id: "exercise",
    name: "Exercise",
    description:
      "Engage in physical activity for at least 30 minutes to improve overall health.",
    valueRequired: true,
  },

  {
    id: "reading",
    name: "Daily Reading",
    description:
      "Read for at least 10 pages a day to expand your knowledge and improve focus.",
    valueRequired: true,
  },

  {
    id: "walking",
    name: "Walking",
    description:
      "Connect with nature by spending time outdoors, taking walks in parks",
    valueRequired: false,
  },
];
