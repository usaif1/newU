// depdenencies
import React from "react";

// components
import { Heading, ScreenWrapper, Text } from "@/components";

const Home: React.FC = () => {
  return (
    <ScreenWrapper className="pt-10">
      {/* <Text className="text-center" color="primary" weight="text-600" size="xl">
        Select a habit
      </Text> */}
      <Heading size="h4" align="center">
        Select a habit
      </Heading>
    </ScreenWrapper>
  );
};

export default Home;
