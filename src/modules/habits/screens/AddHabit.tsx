// dependencies
import React from "react";

// components
import { Divider, FormLabel, Heading, ScreenWrapper, Text } from "@/components";
import { ExerciseForm, HydrationForm, MeditationForm } from "../components";
import { habitList } from "@/data/habits";

const AddActivity: React.FC = () => {
  const habitid = new URLSearchParams(window.location.search).get("habitid");

  const currenHabit = habitList.find((habit) => {
    return habit.id === habitid;
  });

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Start Tracking
      </Heading>
      <Divider height="1rem" />
      <form>
        <div>
          <FormLabel>Select habit to track</FormLabel>
          <Divider />
          <select>
            {habitList.map((habit) => {
              return (
                <option key={habit.id} className="capitalize" value={habit.id}>
                  {habit.name}
                </option>
              );
            })}
          </select>
        </div>
        <Divider height="2rem" />
        <div>
          {habitid === "hydration" ? (
            <div>
              <Text>How many glasses of water</Text>
            </div>
          ) : null}
          {habitid === "meditation" ? (
            <Text>{currenHabit?.description}</Text>
          ) : null}

          <Divider />
          {currenHabit?.valueRequired ? <input type="number" /> : null}
        </div>
      </form>
      {/* {habitid === "hydration" ? <HydrationForm /> : null}
      {habitid === "meditation" ? <MeditationForm /> : null}
      {habitid === "exercise" ? <ExerciseForm /> : null} */}
    </ScreenWrapper>
  );
};

export default AddActivity;
