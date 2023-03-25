import { render, waitFor } from "@testing-library/react";
import Restaurants from "../../views/Restaurants";
import userEvent from "@testing-library/user-event";

describe("<Resturants /> ", () => {
  it("should render the restaurants component", () => {
    render(<Restaurants />);
  });

  it("should enter location and term into search bar form and click search", async () => {
    const { getByRole, getByText, container } = render(<Restaurants />);
    const locationInput = getByText("Enter location");
    const termInput = getByText("Enter search term");
    const searchButton = getByRole("button", { name: "Search" });

    await userEvent.type(locationInput, "New York", {
      pointerEventsCheck: 0,
    });
    await userEvent.type(termInput, "Pizza", {
      pointerEventsCheck: 0,
    });
    await userEvent.click(searchButton);

    const location = container.querySelector('input[name="location"]');
    const term = container.querySelector('input[name="term"]');
    expect(location).toHaveValue("New York");
    expect(term).toHaveValue("Pizza");
  });
});
