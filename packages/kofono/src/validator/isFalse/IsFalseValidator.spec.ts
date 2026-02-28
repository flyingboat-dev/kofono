import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { IsFalseValidator } from "./IsFalseValidator";

describe("IsFalseValidator test", () => {
    let form: Form;
    let ctx: ValidationContext;
    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "test",
            value: false,
            form: form,
        };
    });

    const isFalse = new IsFalseValidator("test", "validation", {});

    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        {
            value: false,
            expected: true,
        },
        {
            value: true,
            expected: false,
        },
        {
            value: "false",
            expected: false,
        },
        {
            value: 0,
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
            const [isValid] = isFalse.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
