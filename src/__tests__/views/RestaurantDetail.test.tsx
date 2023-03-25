import { render, screen } from "@testing-library/react";
import RestaurantDetail from "../../views/RestaurantDetail";

describe("<ResturantDeatil /> ", () => {
  it("should render the restaurant detail component", () => {
    render(<RestaurantDetail />);
  });
});
