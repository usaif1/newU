// dependencies
import { createBrowserRouter } from "react-router-dom";

// components
import { Home } from "@/modules/Home/screens";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

export default router;
