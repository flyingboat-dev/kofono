import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { MaxValidator } from "./MaxValidator";

describe("MaxValidator", () => {
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
        max: number;
    }[] = [
        // string
        {
            expected: true,
            data: "test",
            max: 10,
        },
        {
            expected: true,
            data: "TEST",
            max: 4,
        },
        {
            expected: true,
            data: "  ",
            max: 2,
        },
        {
            expected: false,
            data: "test",
            max: 3,
        },

        // numbers
        {
            expected: true,
            data: 1,
            max: 5,
        },
        {
            expected: true,
            data: 5,
            max: 5,
        },
        {
            expected: false,
            data: 6,
            max: 5,
        },

        // arrays
        {
            expected: false,
            data: ["a", "b", "c", "d", "e", "f"],
            max: 5,
        },
        {
            expected: true,
            data: ["a", "b", "c"],
            max: 3,
        },

        // others
        {
            expected: false,
            data: undefined,
            max: 1,
        },
        {
            expected: false,
            data: null,
            max: 5,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} when testing '${test.data}' with max length of '${test.max}'`, () => {
            ctx.value = test.data;
            const validator = new MaxValidator(
                ctx.selector,
                "validation",
                test.max,
            );
            const [isValid] = validator.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
