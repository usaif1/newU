// depdenencies
import React from "react";

// store
import { habitsStore } from "@/global/stores";

// components
import {
  Heading,
  ScreenWrapper,
  Divider,
  Anchor,
  Calendar,
} from "@/components";
import { HabitCard } from "../components";

const Home: React.FC = () => {
  const dailyHabitsInstances = habitsStore.use.dailyHabitsInstances();
  const weeklyHabitsInstances = habitsStore.use.weeklyHabitsInstances();

  const allHabits = [...dailyHabitsInstances, ...weeklyHabitsInstances];

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        {allHabits.length ? "Dashboard" : "Welcome to Habit Tracker"}
      </Heading>
      <Divider height="1rem" />
      <div>
        <Calendar />
      </div>
      <Divider height="1rem" />
      {allHabits.map((habit) => (
        <HabitCard key={habit.habit_instance_id} habitInstance={habit} />
      ))}

      <div className="w-full absolute left-0 bottom-20 flex justify-center">
        <Anchor
          to="/habits/add"
          className="border border-yellow rounded-lg px-4 py-2"
        >
          {allHabits.length ? "Track more habits" : "Start tracking habits"}
        </Anchor>
      </div>
    </ScreenWrapper>
  );
};

export default Home;
