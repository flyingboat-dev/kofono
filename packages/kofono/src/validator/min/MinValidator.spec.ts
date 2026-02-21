import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { MinValidator } from "./MinValidator";

describe("MinValidator", () => {
    let form: Form;
    let ctx: ValidationContext = {
        selector: "test",
        value: "",
        form: {} as Form,
    };
    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "test",
            value: "",
            form: form,
        };
    });

    const tests: {
        expected: boolean;
        data: any;
        min: number;
    }[] = [
        // string
        {
            expected: true,
            data: "test",
            min: 1,
        },
        {
            expected: true,
            data: "TEST",
            min: 4,
        },
        {
            expected: true,
            data: "  ",
            min: 2,
        },
        {
            expected: false,
            data: "test",
            min: 10,
        },

        // numbers
        {
            expected: true,
            data: 5,
            min: 5,
        },
        {
            expected: false,
            data: 4,
            min: 5,
        },

        // arrays
        {
            expected: false,
            data: ["a", "b"],
            min: 5,
        },
        {
            expected: true,
            data: ["a", "b", "c"],
            min: 3,
        },

        // others
        {
            expected: false,
            data: undefined,
            min: 1,
        },
        { expected: false, data: null, min: 5 },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} when testing '${test.data}' with min length of '${test.min}'`, () => {
            ctx.value = test.data;
            const validator = new MinValidator(
                ctx.selector,
                "validation",
                test.min,
            );
            const [isValid] = validator.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
