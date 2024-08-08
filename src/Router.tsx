// dependencies
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import { NotFound } from "@/components";

// screens
import { Home } from "@/modules/home/screens";
import { AddHabit, EditHabit } from "@/modules/habits/screens";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },

    {
      path: "/habits",
      children: [
        {
          index: true,
          element: <NotFound />,
        },
        {
          path: "add", // Route with parameter
          element: <AddHabit />,
        },
        {
          path: "edit/:habitinstance", // Route with parameter
          element: <EditHabit />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
