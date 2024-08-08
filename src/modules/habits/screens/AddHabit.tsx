// dependencies
import React, { useEffect } from "react";

// components
import { Divider, FormLabel, Heading, ScreenWrapper, Text } from "@/components";
import { habitList } from "@/data/habits";

// store
import habitsStore from "../store";

const AddActivity: React.FC = () => {
  const selectedHabit = habitsStore.use.selectedHabit();
  const selectedHabitFrequency = habitsStore.use.selectedHabitFrequency();

  const changeHabit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const habit = habitList.find((habit) => habit.id === e.target.value);

    habitsStore.setState((state) => ({
      ...state,
      selectedHabit: habit,
    }));
  };

  const changeFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    habitsStore.setState((state) => ({
      ...state,
      selectedHabitFrequency: e.target.value as "daily" | "weekly",
    }));
  };

  useEffect(() => {
    habitsStore.setState((state) => ({
      ...state,
      selectedHabit: habitList[0],
      selectedHabitFrequency: "daily",
    }));
  }, []);

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Start Tracking
      </Heading>
      <Divider height="1rem" />
      <form>
        <div className="w-full">
          <FormLabel>Select habit to track</FormLabel>
          <Divider />
          <select
            value={selectedHabit?.id || ""}
            onChange={changeHabit}
            className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2"
          >
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
        <div className="w-full">
          <FormLabel size="sm">
            How frequently do you want to track it?
          </FormLabel>
          <Divider />
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-4 items-center">
              <input
                type="radio"
                id="daily"
                checked={selectedHabitFrequency === "daily"}
                name="daily"
                value="daily"
                onChange={changeFrequency}
              />
              <FormLabel size="sm" htmlFor="daily">
                Daily
              </FormLabel>
            </div>
            <div className="flex gap-x-4 items-center">
              <input
                type="radio"
                checked={selectedHabitFrequency === "weekly"}
                id="weekly"
                name="weekly"
                value="weekly"
                onChange={changeFrequency}
              />
              <FormLabel size="sm" htmlFor="weekly">
                Weekly
              </FormLabel>
            </div>
          </div>
        </div>
        <Divider height="2rem" />
        <div>
          {selectedHabit?.valueRequired ? (
            <div>
              <FormLabel size="sm">{selectedHabit.valueText}</FormLabel>
              <Divider />
              <div className="flex gap-x-2 items-end">
                <input
                  type="number"
                  className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2"
                />
                <Text size="xs">{selectedHabit?.unit}</Text>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="w-full flex justify-center absolute left-0 bottom-20">
          <button className="border border-yellow px-4 py-2 rounded-lg text-alternate text-sm">
            Start tracking
          </button>
        </div>
      </form>
    </ScreenWrapper>
  );
};

export default AddActivity;
