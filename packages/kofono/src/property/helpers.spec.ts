import { describe, expect, it } from "vitest";
import { validateSelector } from "./helpers";

describe("validateSelector()", () => {
    type Scenario = [string, [boolean, string]];
    const scenarios: Scenario[] = [
        ["", [false, "selector cannot be empty."]],
        ["a", [true, ""]],
        ["1", [true, ""]],
        [
            "_",
            [
                false,
                "selector must start with an alphanumeric character. Got: _",
            ],
        ],
        ["a1", [true, ""]],
        ["a_", [true, ""]],
        ["a.b", [true, ""]],
        [
            "#425sdf",
            [
                false,
                "selector must contains only alphanumeric, dot or underline. Got: #425sdf",
            ],
        ],
    ];

    for (const [selector, expected] of scenarios) {
        it(`should return ${expected} for selector: ${selector}`, () => {
            const [isValid, errorMessage] = validateSelector(selector);
            expect(isValid).toEqual(expected[0]);
            expect(errorMessage).toEqual(expected[1]);
        });
    }
});
