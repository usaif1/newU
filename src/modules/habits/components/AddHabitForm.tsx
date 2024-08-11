// dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Divider, FormLabel, Text } from "@/components";

// store
import { homeStore, habitsStore } from "@/global/stores";

// service
import habitService from "../service";

// data & types
import { habitList } from "@/data/habits";
import { Habit, HabitInstace, TrackedHabits } from "@/types";

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
    setHabitValue("");
  };

  const changeFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHabitFrequency(e.target.value as "daily" | "weekly");
  };

  const checkIfHabitInstanceExists = () => {
    const habitInstance = dailyHabitsInstances.find((instance) => {
      return instance.habit_id === selectedHabit?.habit_id;
    });

    if (habitInstance) return true;

    return false;
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkIfHabitInstanceExists()) return alert("Habit alreay added");

    const payload: HabitInstace = {
      created_on: currentDate,
      habit: selectedHabit as Habit,
      habit_id: selectedHabit?.habit_id || "",
      habit_instance_id: `${selectedHabit?.habit_id}${selectedHabitFrequency}`,
      habit_instance_threshold: selectedHabit?.habit_valueRequired
        ? habitValue
        : "",
      is_active: true,
      frequency: selectedHabitFrequency,
    };

    const dailyHabits = [...dailyHabitsInstances];
    dailyHabits.push(payload);

    const tracker: TrackedHabits = {
      frequency: selectedHabitFrequency,
      habit: selectedHabit as Habit,
      habit_id: selectedHabit?.habit_id || "",
      habitInstance: payload,
      habitInstance_id: payload.habit_instance_id,
      inputDay: currentDate,
      inputValue: 0,
      is_completed: false,
      requiredValue: Number(habitValue),
      streak: 0,
      tracker_id: `${selectedHabit?.habit_id}${selectedHabitFrequency}${currentDate}`,
    };

    habitService.createNewHabitInstanceDaily({
      dailyHabits: dailyHabits,
      tracker: tracker,
    });

    navigate(-1);
  };

  useEffect(() => {
    setSelectedHabit(habitList[0]);
    setSelectedHabitFrequency("daily");

    return () => {
      setSelectedHabit(undefined);
      setSelectedHabitFrequency("daily");
      setHabitValue("");
    };
  }, []);

  return (
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
        <FormLabel size="sm">How frequently do you want to track it?</FormLabel>
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
  );
};

export default AddActivity;
