import { expect, test } from "vitest";
import { ReadOnlyDataSelector } from "./ReadOnlyDataSelector";
import { ReadOnlySelectorError } from "./ReadOnlySelectorError";

test("ReadOnlyDataSelector test", () => {
    const readOnlySelector = new ReadOnlyDataSelector();
    expect(() => {
        readOnlySelector.set("a", "foo", {
            a: "bar",
        });
    }).toThrow(ReadOnlySelectorError);

    expect(() => {
        readOnlySelector.delete("a", {
            a: "foo",
        });
    }).toThrow(ReadOnlySelectorError);
});
