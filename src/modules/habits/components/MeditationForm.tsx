// dependencies
import React from "react";

// components
import { Divider, FormLabel, Text } from "@/components";

const MeditationForm: React.FC = () => {
  return (
    <form>
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
      <div className="flex justify-center mt-12">
        <button className="self-center text-white border border-white rounded-lg px-4 py-2">
          Start Tracking
        </button>
      </div>
    </form>
  );
};

export default MeditationForm;
