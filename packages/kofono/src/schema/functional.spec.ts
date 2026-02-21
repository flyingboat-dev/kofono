import { expect, test } from "vitest";
import { PropertyType } from "../property/types";
import { property } from "./functional";

test("test property()", () => {
    let output = property("test", PropertyType.Boolean);
    expect(output).toEqual({
        test: {
            type: "boolean",
        },
    });

    output = property("test", PropertyType.String, ["notEmpty"]);
    expect(output).toEqual({
        test: {
            type: "string",
            $v: ["notEmpty"],
        },
    });
});
