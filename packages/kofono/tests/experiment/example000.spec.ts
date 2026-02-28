import { expect, test } from "vitest";
import { K, max } from "../../src";

test("test disposable test", async () => {
    const form = await K.form({
        $id: "myform",
        age: K.number(max(100)),
    });

    expect(form.id).toBe("myform");
});
