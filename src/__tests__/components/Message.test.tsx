import { render, screen } from "@testing-library/react";
import Message from "../../components/Message";

describe("<Message /> ", () => {
  const message = "This is a test message";

  it("should render the message component", () => {
    const { container, getByText } = render(<Message message={message} />);
    expect(container).toBeInTheDocument();

    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();
  });
});
