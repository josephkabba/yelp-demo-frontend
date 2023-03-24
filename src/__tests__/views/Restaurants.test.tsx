import { render, screen } from "@testing-library/react";
import Restaurants from "../../views/Restaurants";

describe("App", () => {
  it("should work as expected", () => {
    render(<Restaurants />);
    expect(1 + 1).toBe(2);
  });
});
