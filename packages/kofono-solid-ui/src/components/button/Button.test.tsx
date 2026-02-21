import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Button } from "./Button";

const user = userEvent.setup();

test("increments value", async () => {
    let counter = 0;
    const { getByRole } = render(() => (
        <Button onClick={() => counter++} data-test="val">
            Hello
        </Button>
    ));
    const button = getByRole("button");
    expect(button).toHaveTextContent("Hello");
    await user.click(button);
    expect(counter).toBe(1);
    expect(button).toHaveAttribute("data-test", "val");
});
