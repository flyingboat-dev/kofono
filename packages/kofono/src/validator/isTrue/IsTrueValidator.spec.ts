import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { IsTrueValidator } from "./IsTrueValidator";

describe("IsTrueValidator test", () => {
    let form: Form;
    let ctx: ValidationContext;
    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "test",
            value: true,
            form: form,
        };
    });

    const isTrue = new IsTrueValidator("test", "validation", {});

    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        {
            value: true,
            expected: true,
        },
        {
            value: false,
            expected: false,
        },
        {
            value: "true",
            expected: false,
        },
        {
            value: 1,
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
            value: [],
            expected: false,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${test.value}'`, () => {
            ctx.value = test.value;
            const [isValid] = isTrue.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
