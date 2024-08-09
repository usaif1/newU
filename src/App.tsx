// router
import { useEffect } from "react";
import Router from "./Router";

// store
import { homeStore } from "@/global/stores";

// utils
import { dateList } from "@/utils/general";

function App() {
  useEffect(() => {
    homeStore.setState((state) => ({
      ...state,
      currentDate: dateList[0].date,
    }));
  }, []);

  return <Router />;
}

export default App;
