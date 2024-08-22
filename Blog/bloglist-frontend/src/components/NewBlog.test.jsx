import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

describe("NewBlog", () => {
  test("calls event handler with correct data", async () => {
    const user = userEvent.setup();
    const doCreate = vi.fn();

    render(<NewBlog doCreate={doCreate} />);
    screen.debug();
    const title = screen.getByTestId("title");
    const url = screen.getByTestId("url");
    const author = screen.getByTestId("author");
    const button = screen.getByText("Create");

    await user.type(title, "Testing the testing");
    await user.type(url, "http://example.com");
    await user.type(author, "Ted Tester");
    await user.click(button);

    expect(doCreate.mock.calls).toHaveLength(1);
    /*mock.calls returns an array where each element is an array of the arguments
     that were passed to the mock function for each call. */
    expect(doCreate.mock.calls[0][0]).toEqual({
      title: "Testing the testing",
      url: "http://example.com",
      author: "Ted Tester",
    });
  });
});
