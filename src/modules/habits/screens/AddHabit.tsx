// dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Divider, FormLabel, Heading, ScreenWrapper, Text } from "@/components";
import { habitList } from "@/data/habits";

// store
import { homeStore, habitsStore } from "@/global/stores";

// types
import { Habit, HabitInstace } from "@/types";

const AddActivity: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>(
    undefined
  );
  const [selectedHabitFrequency, setSelectedHabitFrequency] = useState<
    "daily" | "weekly"
  >("daily");
  const dailyHabitsInstances = habitsStore.use.dailyHabitsInstances();
  const currentDate = homeStore.use.currentDate();

  const [habitValue, setHabitValue] = useState<string>("");

  const changeHabit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const habit = habitList.find((habit) => habit.habit_id === e.target.value);

    setSelectedHabit(habit);
  };

  const changeFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHabitFrequency(e.target.value as "daily" | "weekly");
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: HabitInstace = {
      created_on: currentDate,
      habit: selectedHabit as Habit,
      habit_id: selectedHabit?.habit_id || "",
      habit_instance_id: `${selectedHabit?.habit_id}${selectedHabitFrequency}`,
      habit_instance_threshold: habitValue,
      is_active: true,
    };

    const dailyHabits = [...dailyHabitsInstances];
    dailyHabits.push(payload);

    habitsStore.setState((state) => ({
      ...state,
      dailyHabitsInstances: dailyHabits,
    }));

    navigate(-1);
  };

  useEffect(() => {
    setSelectedHabit(habitList[0]);
    setSelectedHabitFrequency("daily");
  }, []);

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Start Tracking
      </Heading>
      <Divider height="1rem" />
      <form onSubmit={submitHandler}>
        <div className="w-full">
          <FormLabel>Select habit to track</FormLabel>
          <Divider />
          <select
            value={selectedHabit?.habit_id || ""}
            onChange={changeHabit}
            className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2"
          >
            {habitList.map((habit) => {
              return (
                <option
                  key={habit.habit_id}
                  className="capitalize"
                  value={habit.habit_id}
                >
                  {habit.habit_name}
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
          {selectedHabit?.habit_valueRequired ? (
            <div>
              <FormLabel size="sm" htmlFor="habitValue">
                {selectedHabit.habit_valueText}
              </FormLabel>
              <Divider />
              <div className="flex gap-x-2 items-end">
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHabitValue(e.target.value)
                  }
                  autoComplete="off"
                  name="habitValue"
                  value={habitValue}
                  className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2"
                />
                <Text size="xs">{selectedHabit?.habit_unit}</Text>
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
