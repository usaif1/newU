// dependencies
import React from "react";

// components
import { Divider, FormLabel, Text } from "@/components";

const ExerciseForm: React.FC = () => {
  return (
    <form>
      <div>
        <FormLabel size="xs">How many hours do you want to workout?</FormLabel>
        <Divider />
        <input type="number" />
      </div>
      <Divider height="2rem" />
      <div>
        <FormLabel size="xs">Tracking Frequency</FormLabel>
        <Divider />
        <div className="flex gap-x-4">
          <input type="radio" value="daily" />
          <Text size="sm">Daily</Text>
        </div>
        <Divider />
        <div className="flex gap-x-4">
          <input type="radio" value="daily" />
          <Text size="sm">Weekly</Text>
        </div>
      </div>
      <Divider height="2rem" />
      <div>
        <FormLabel>Value</FormLabel>
        <Divider />
        <input type="number" />
      </div>
      <div className="flex justify-center mt-12">
        <button className="self-center text-white border border-white rounded-lg px-4 py-2">
          Start Tracking
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
