// depdenencies
import React, { useEffect } from "react";

// store
import { habitsStore, homeStore } from "@/global/stores";

// components
import {
  Heading,
  ScreenWrapper,
  Divider,
  Anchor,
  Calendar,
} from "@/components";
import { HabitTrackerCard } from "../components";
import { HabitInstace } from "@/types";

const Home: React.FC = () => {
  const dailyHabitsInstances = habitsStore.use.dailyHabitsInstances();
  const weeklyHabitsInstances = habitsStore.use.weeklyHabitsInstances();
  const currentDate = homeStore.use.currentDate();

  const [habitInstacesToShow, setHabitInstacesToShow] = React.useState<
    HabitInstace[]
  >([]);

  useEffect(() => {
    const allHabitsInstances = [
      ...dailyHabitsInstances,
      ...weeklyHabitsInstances,
    ];

    const filteredHabits = allHabitsInstances.filter((habitInstance) => {
      return habitInstance.created_on <= currentDate;
    });

    setHabitInstacesToShow(filteredHabits);
  }, [currentDate, dailyHabitsInstances, weeklyHabitsInstances]);

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        {habitInstacesToShow.length ? "Dashboard" : "Welcome to Habit Tracker"}
      </Heading>
      <Divider height="1rem" />
      <div>
        <Calendar />
      </div>
      <Divider height="1rem" />
      <div className="flex flex-col gap-y-3">
        {habitInstacesToShow.map((habitInstance) => (
          <HabitTrackerCard
            key={habitInstance.habit_instance_id}
            habitInstance={habitInstance}
          />
        ))}
      </div>

      <div className="w-full absolute left-0 bottom-20 flex justify-center">
        <Anchor
          to="/habits/add"
          className="border border-yellow rounded-lg px-4 py-2"
        >
          {habitInstacesToShow.length
            ? "Track more habits"
            : "Start tracking habits"}
        </Anchor>
      </div>
    </ScreenWrapper>
  );
};

export default Home;
