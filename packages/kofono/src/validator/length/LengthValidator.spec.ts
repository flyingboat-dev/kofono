import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { LengthValidator } from "./LengthValidator";

describe("LengthValidator test", () => {
    let form: Form;
    let ctx: ValidationContext;

    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "test",
            value: "",
            form,
        };
    });

    const length = new LengthValidator("test", "validation", {
        value: 5,
    });

    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        {
            value: "hello",
            expected: true,
        },
        {
            value: "world",
            expected: true,
        },
        {
            value: "helloo",
            expected: false,
        },
        {
            value: "hi",
            expected: false,
        },
        {
            value: "",
            expected: false,
        },
        {
            value: 12345,
            expected: false,
        },
        {
            value: null,
            expected: false,
        },
        {
            value: undefined,
            expected: false,
        },
        {
            value: true,
            expected: false,
        },
        {
            value: ["h", "e", "l", "l", "o"],
            expected: true,
        },
        {
            value: { value: "hello" },
            expected: false,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${String(test.value)}'`, () => {
            ctx.value = test.value;
            const [isValid] = length.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
