// depdenencies
import React from "react";

// components
import { Heading, ScreenWrapper, Divider, Anchor } from "@/components";

const Home: React.FC = () => {
  return (
    <ScreenWrapper className="py-10">
      <Heading size="h6" align="center">
        Dashboard
      </Heading>
      <Divider height="1rem" />
      <div className="w-full absolute left-0 bottom-20 flex justify-center">
        <Anchor
          to="/habits/add"
          className="bottom-20 border border-yellow rounded-lg px-4 py-2"
        >
          Start tracking habits
        </Anchor>
      </div>
    </ScreenWrapper>
  );
};

export default Home;
