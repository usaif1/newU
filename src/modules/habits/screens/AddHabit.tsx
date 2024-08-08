// dependencies
import React from "react";

// components
import { Divider, FormLabel, Heading, ScreenWrapper } from "@/components";
import { habitList } from "@/data/habits";

const AddActivity: React.FC = () => {
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
          <select className="w-full h-8 rounded-lg text-sm text-primary bg-black border border-yellow px-2">
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
          <div>
            <div className="flex gap-x-4 items-center">
              <input type="radio" id="daily" name="daily" value="daily" />
              <FormLabel size="sm" htmlFor="daily">
                Daily
              </FormLabel>
            </div>
            <div className="flex gap-x-4 items-center">
              <input type="radio" id="weekly" name="weekly" value="weekly" />
              <FormLabel size="sm" htmlFor="weekly">
                Weekly
              </FormLabel>
            </div>
          </div>
        </div>
      </form>
    </ScreenWrapper>
  );
};

export default AddActivity;
