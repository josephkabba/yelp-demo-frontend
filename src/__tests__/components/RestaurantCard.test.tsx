import { render } from "@testing-library/react";
import RestaurantCard from "../../components/RestaurantCard";
import { Restaurant } from "../../api/restaurants";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("<RestaurantCard /> ", () => {
  const restaurant: Restaurant = {
    id: "1",
    name: "Test Restaurant",
    location: {
      address1: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    },
    image_url: "https://via.placeholder.com/150",
    review_count: 100,
    rating: 4.5,
    categories: [
      {
        title: "Test Category",
        alias: "test-category",
      },
    ],
    phone: "123-456-7890",
  };

  it("should render the restaurant card component", () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={[`/:id`]}>
        <Routes>
          <Route
            path=":id"
            element={<RestaurantCard restaurant={restaurant} />}
          />
        </Routes>
      </MemoryRouter>
    );
  });
});
