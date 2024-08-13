/**
 * The EditHabit component allows users to edit an existing habit instance.
 * It displays the current habit details and provides controls to update the habit's value.
 * 
//  todo: Improvements ( brackets contain reason for current approach )  - 
* - We can use onChange event handler to update tracked value and edit value instead of useEffect ( used to capture first render value for development changes/errors )
* - We can use a single function to handle both boolean and value habit changes ( separated logic for ease of development and time constraints )
*/

// dependencies
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// store
import { habitsStore, homeStore } from "@/global/stores";

// components
import { Divider, FormLabel, Heading, ScreenWrapper, Text } from "@/components";

// types
import { Habit, HabitInstace, TrackedHabits } from "@/types";
import habitService from "../service";

const EditActivity: React.FC = () => {
  const { habitinstanceid } = useParams();
  const navigate = useNavigate();

  const currentDate = homeStore.use.currentDate();
  const trackedHabits = habitsStore.use.trackedHabits();
  const dailyHabitsInstances = habitsStore.use.dailyHabitsInstances();

  const [habitInstance, setHabitInstance] = useState<HabitInstace | null>();
  const [value, setValue] = useState<number>(0);
  const [boolValue, setBoolValue] = useState<boolean>(false);
  const [valueToEdit, setValueToEdit] = useState<string>("");

  // function to edit habit value
  const onClick = useCallback((type: "add" | "subtract") => {
    if (type === "add") {
      setValue((prev) => {
        return prev + 1;
      });
    } else {
      setValue((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }
  }, []);

  // function to edit habit value in case of boolean habits ( habits with no values )
  const onClickBool = (is_completed: boolean) => {
    setBoolValue(is_completed);

    const dateFilteredHabits = trackedHabits.filter((habit) => {
      return habit.inputDay === currentDate;
    });

    const foundHabit = dateFilteredHabits.find((habit) => {
      return habit.habitInstance_id === habitinstanceid;
    });

    if (foundHabit) {
      const indexOfHabitTracker = trackedHabits.findIndex((habit) => {
        return (
          habit.habitInstance_id === foundHabit?.habitInstance_id &&
          habit.inputDay === currentDate
        );
      });

      const orginalTrackedHabits = [...trackedHabits];

      orginalTrackedHabits[indexOfHabitTracker] = {
        ...orginalTrackedHabits[indexOfHabitTracker],
        inputValue: 0,
        is_completed: is_completed,
      };

      habitsStore.setState((state) => ({
        ...state,
        trackedHabits: orginalTrackedHabits,
      }));
    }
  };

  // function to edit habit threshold
  const valueEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueToEdit(e.target.value);
  };

  /**
   * this function checks if the selected habit exists in the daily habits tracker
   * if it does not, it creates a new habit tracker for that habit instance ( duplicate functionality in HabitTrackerCard )
   * it also updates the state with the new tracker
   */
  useEffect(() => {
    const foundHabitInstance = dailyHabitsInstances.find((habit) => {
      return habit.habit_instance_id === habitinstanceid;
    });

    const dateFilteredHabits = trackedHabits.filter((habit) => {
      return habit.inputDay === currentDate;
    });

    const foundHabit = dateFilteredHabits.find((habit) => {
      return habit.habitInstance_id === habitinstanceid;
    });

    setValueToEdit(`${foundHabit?.requiredValue}`);

    if (!foundHabit) {
      const origingalTracker = [...trackedHabits];

      const tracker: TrackedHabits = {
        frequency: foundHabitInstance?.frequency as "daily" | "weekly",
        habit: foundHabitInstance?.habit as Habit,
        habit_id: foundHabitInstance?.habit_id || "",
        habitInstance: foundHabitInstance as HabitInstace,
        habitInstance_id: foundHabitInstance?.habit_instance_id || "",
        inputDay: currentDate,
        inputValue: 0,
        is_completed: false,
        requiredValue: Number(foundHabitInstance?.habit_instance_threshold),
        streak: 0,
        tracker_id: `${foundHabitInstance?.habit_id}${foundHabitInstance?.frequency}${currentDate}`,
        cumulative:
          dateFilteredHabits[dateFilteredHabits.length - 1]?.cumulative || 0,
      };

      origingalTracker.push(tracker);

      habitService.createNewHabitTracker(origingalTracker);
    }

    setHabitInstance(foundHabitInstance);
    setValue(foundHabit?.inputValue ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * this function updates the habit tracker state when the user updates the habit value
   */
  useEffect(() => {
    if (value) {
      const dateFilteredHabits = trackedHabits.filter((habit) => {
        return habit.inputDay === currentDate;
      });

      const foundHabit = dateFilteredHabits.find((habit) => {
        return habit.habitInstance_id === habitinstanceid;
      });

      const indexOfFoundHabit = trackedHabits.findIndex((habit) => {
        return habit.tracker_id === foundHabit?.tracker_id;
      });

      if (foundHabit) {
        const indexOfHabitTracker = trackedHabits.findIndex((habit) => {
          return (
            habit.habitInstance_id === foundHabit?.habitInstance_id &&
            habit.inputDay === currentDate
          );
        });

        const orginalTrackedHabits = [...trackedHabits];

        orginalTrackedHabits[indexOfHabitTracker] = {
          ...orginalTrackedHabits[indexOfHabitTracker],
          inputValue: value,
          is_completed: value >= foundHabit?.requiredValue,
          cumulative:
            value + (trackedHabits[indexOfFoundHabit - 1]?.cumulative || 0),
        };

        habitsStore.setState((state) => ({
          ...state,
          trackedHabits: orginalTrackedHabits,
        }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /**
   * this function updates the habit tracker state when the user updates the habit threshold
   */
  useEffect(() => {
    if (valueToEdit) {
      const dateFilteredHabits = trackedHabits.filter((habit) => {
        return habit.inputDay === currentDate;
      });

      const foundHabit = dateFilteredHabits.find((habit) => {
        return habit.habitInstance_id === habitinstanceid;
      });

      if (foundHabit) {
        const indexOfHabitTracker = trackedHabits.findIndex((habit) => {
          return (
            habit.habitInstance_id === foundHabit?.habitInstance_id &&
            habit.inputDay === currentDate
          );
        });

        const orginalTrackedHabits = [...trackedHabits];

        orginalTrackedHabits[indexOfHabitTracker] = {
          ...orginalTrackedHabits[indexOfHabitTracker],
          requiredValue: parseInt(valueToEdit),
        };

        habitsStore.setState((state) => ({
          ...state,
          trackedHabits: orginalTrackedHabits,
        }));

        const foundHabitInstanceIndex = dailyHabitsInstances.findIndex(
          (habitInstance) => {
            return habitInstance.habit_instance_id === habitinstanceid;
          }
        );

        const originalHabitInstances = [...dailyHabitsInstances];

        originalHabitInstances[foundHabitInstanceIndex] = {
          ...originalHabitInstances[foundHabitInstanceIndex],
          habit_instance_threshold: `${valueToEdit}`,
        };

        habitsStore.setState((state) => ({
          ...state,
          dailyHabitsInstances: originalHabitInstances,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueToEdit]);

  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Edit Habit
      </Heading>
      <Divider height="1rem" />
      <div className="flex justify-end">
        <Text size="xs" color="secondary">
          {" "}
          Date: {currentDate}
        </Text>
      </div>
      <Divider height="2rem" />
      <div>
        <Text>{habitInstance?.habit?.habit_name}</Text>
        <Divider height="1rem" />
        {habitInstance?.habit?.habit_valueRequired ? (
          <div className="flex items-end justify-between">
            <div className="flex gap-x-2">
              <Text
                className="w-32 bg-transparent"
                color="secondary"
                weight="text-400"
              >
                {value} / {habitInstance?.habit_instance_threshold}{" "}
                <span className="text-secondary text-xs font-normal">
                  {habitInstance?.habit?.habit_unit}
                </span>
              </Text>
              <div className="flex gap-x-2">
                <button
                  onClick={() => onClick("subtract")}
                  className="w-6 h-6 border border-slate rounded-full flex items-center justify-center text-secondary"
                >
                  -
                </button>
                <button
                  onClick={() => onClick("add")}
                  className="w-6 h-6 border border-slate rounded-full flex items-center justify-center text-secondary"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Text>Did you perform {habitInstance?.habit.habit_name}?</Text>
            <Divider />
            <div className="w-full flex items-center gap-x-4">
              <button
                onClick={() => onClickBool(true)}
                className={`w-20 border ${
                  boolValue ? "border-yellow bg-lightorange" : "border-offwhite"
                }  text-primary flex justify-center rounded-md`}
              >
                Yes
              </button>
              <button
                onClick={() => onClickBool(false)}
                className={`w-20 border ${
                  !boolValue
                    ? "border-yellow bg-lightorange"
                    : "border-offwhite"
                }  text-primary flex justify-center rounded-md`}
              >
                No
              </button>
            </div>
          </div>
        )}
        {/* edit threshold */}
        {habitInstance?.habit_instance_threshold &&
        parseInt(habitInstance?.habit_instance_threshold) > 0 ? (
          <>
            <Divider height="6rem" />
            <div>
              <FormLabel size="sm" htmlFor="habitValue">
                Edit required value
              </FormLabel>
              <Divider />
              <div className="flex gap-x-2 items-end">
                <input
                  onChange={valueEditHandler}
                  type="number"
                  autoComplete="off"
                  name="habitValue"
                  value={valueToEdit}
                  className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2"
                />
                <Text size="xs">{habitInstance?.habit?.habit_unit}</Text>
              </div>
            </div>
          </>
        ) : null}

        {/* add button */}
        <div className="w-full absolute bottom-32 left-0 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-20 h-10 text-center border border-yellow text-primary rounded-lg
          hover:bg-yellow hover:text-black hover:font-medium
          "
          >
            Done
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default EditActivity;
