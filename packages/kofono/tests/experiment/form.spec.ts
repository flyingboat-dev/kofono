import { expect as e, test } from "vitest";
import { K } from "../../src";

test("test prop var ref", async () => {
    const form = await K.form({
        name: K.string().$v((x) => x.notEmpty()),
        qty: K.number().$v((x) =>
            x.between(1, 10).expect("number between 1 and 10 only"),
        ),
    });

    const name = form.prop("name");
    e(name.isValid()).toBeFalsy();
    await form.update("name", "John Doe");
    e(name.isValid()).toBeTruthy();
});
