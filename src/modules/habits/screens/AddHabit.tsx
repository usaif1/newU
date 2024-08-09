// dependencies
import React from "react";

// components
import { Divider, Heading, ScreenWrapper } from "@/components";
import { AddHabitForm } from "../components";

const AddActivity: React.FC = () => {
  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Start Tracking
      </Heading>
      <Divider height="1rem" />
      <AddHabitForm />
    </ScreenWrapper>
  );
};

export default AddActivity;
