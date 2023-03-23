import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Restaurants from "./views/Restaurants";
import RestaurantDetail from "./views/RestaurantDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Restaurants />,
  },
  {
    path: "/:restaurantId",
    element: <RestaurantDetail />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
