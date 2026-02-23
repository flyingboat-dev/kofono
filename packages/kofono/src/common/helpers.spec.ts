import { describe, expect, it, test } from "vitest";
import {
    isEmptyString,
    isObjectLiteral,
    objectHasKey,
    optional,
} from "./helpers";

describe("objectHasKey()", () => {
    const scenarios: [boolean, any, string][] = [
        [true, { a: 1, b: 2 }, "a"],
        [true, { a: 1, b: 2 }, "b"],
        [false, { a: 1, b: 2 }, "c"],
        [false, {}, "a"],
        [false, null, "a"],
        [false, undefined, "a"],
        [false, [], "a"],
        [false, [], "a"],
    ];

    for (const [expected, obj, key] of scenarios) {
        it(`(${JSON.stringify(obj)}, ${JSON.stringify(key)}) should return ${Boolean(expected)}`, () => {
            const result = objectHasKey(obj as any, key);
            expect(result).toBe(expected);
        });
    }
});

describe("isObjectLiteral()", () => {
    const scenarios: [boolean, any][] = [
        [true, { a: 1, b: 2 }],
        [true, {}],
        [true, { a: { b: 1 } }],
        [false, 1],
        [false, "string"],
        [false, null],
        [false, undefined],
        [false, []],
        [false, new Date()],
        [false, () => {}],
        [false, Symbol("symbol")],
        [true, Object.create({})],
    ];

    for (const [expected, value] of scenarios) {
        it(`(${JSON.stringify(value)}) should return ${Boolean(expected)}`, () => {
            const result = isObjectLiteral(value);
            expect(result).toBe(expected);
        });
    }
});

test("uuidV4() should return a valid UUID", () => {
    const uuid = crypto.randomUUID();
    expect(uuid).toBeTypeOf("string");
    expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(uuid).toHaveLength(36);
});

test("isEmpty() should return true for empty string", () => {
    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        { value: undefined, expected: false },
        { value: null, expected: false },
        { value: 1, expected: false },
        { value: false, expected: false },
        { value: "", expected: true },
        { value: " ", expected: true },
        { value: "         ", expected: true },
        { value: "      d  ", expected: false },
        { value: "\t", expected: true },
        { value: "\n", expected: true },
    ];

    for (const test of tests) {
        expect(isEmptyString(test.value)).toBe(test.expected);
    }
});

test("optional()", () => {
    const tests: {
        key: string;
        value: any;
        expected: Record<string, any>;
    }[] = [
        {
            key: "test",
            value: undefined,
            expected: {},
        },
        {
            key: "test",
            value: null,
            expected: {
                test: null,
            },
        },
        {
            key: "test",
            value: 123,
            expected: {
                test: 123,
            },
        },
        {
            key: "test",
            value: "abc",
            expected: {
                test: "abc",
            },
        },
        {
            key: "test",
            value: [],
            expected: {
                test: [],
            },
        },
        {
            key: "test",
            value: {},
            expected: {
                test: {},
            },
        },
        {
            key: "test",
            value: true,
            expected: {
                test: true,
            },
        },
        {
            key: "test",
            value: false,
            expected: {
                test: false,
            },
        },
        {
            key: "test",
            value: 0,
            expected: {
                test: 0,
            },
        },
        {
            key: "test",
            value: NaN,
            expected: {
                test: NaN,
            },
        },
    ];

    for (const { key, value, expected } of tests) {
        const result = optional(key, value);
        expect(result).toEqual(expected);
    }
});
