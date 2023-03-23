import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Restaurants from "./views/Restaurants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Restaurants />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
