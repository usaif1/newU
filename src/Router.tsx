// dependencies
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import { NotFound } from "@/components";

// screens
import { Home } from "@/modules/home/screens";
import { AddActivity, EditActivity } from "@/modules/activities/screens";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },

    {
      path: "/activities",
      children: [
        {
          index: true,
          element: <NotFound />,
        },
        {
          path: "add/:habitid", // Route with parameter
          element: <AddActivity />,
        },
        {
          path: "edit/:habitinstance", // Route with parameter
          element: <EditActivity />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
