// depdenencies
import React from "react";

// components
import { Heading, ScreenWrapper, Divider } from "@/components";
import { HabitCard } from "../components";

// data
import { habitList } from "@/data/habits";

const Home: React.FC = () => {
  return (
    <ScreenWrapper className="py-10">
      <Heading size="h4" align="center">
        Select a habit
      </Heading>
      <Divider height="1rem" />
      <div className="flex flex-col gap-y-6">
        {habitList.map((habit) => {
          return <HabitCard key={habit.id} habit={habit} />;
        })}
      </div>
    </ScreenWrapper>
  );
};

export default Home;
