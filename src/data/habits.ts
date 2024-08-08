// types
import { Habit } from "@/types";

export const habitList: Habit[] = [
  {
    id: "hydration",
    name: "Drink Water",
    description: "Drink at least 8 glasses of water each day to stay hydrated.",
    valueRequired: true,
    valueText: "How much water will you drink?",
    unit: "glasses",
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
    valueText: "How many hours will you exercise?",
    unit: "hours",
  },

  {
    id: "reading",
    name: "Daily Reading",
    description:
      "Read for at least 10 pages a day to expand your knowledge and improve focus.",
    valueRequired: true,
    valueText: "How many pages will you read?",
    unit: "pages",
  },

  {
    id: "walking",
    name: "Walking",
    description:
      "Connect with nature by spending time outdoors, taking walks in parks",
    valueRequired: false,
  },
];
