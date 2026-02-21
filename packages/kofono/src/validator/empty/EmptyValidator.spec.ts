import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { EmptyValidator } from "./EmptyValidator";

describe("EmptyValidator test", () => {
    let form: Form;
    let ctx: ValidationContext;
    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "test",
            value: "",
            form: form,
        };
    });

    const isEmpty = new EmptyValidator("test", "validation", {});

    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        {
            value: "",
            expected: true,
        },
        {
            value: " ",
            expected: true,
        },
        {
            value: "        ",
            expected: true,
        },
        {
            value: "a",
            expected: false,
        },
        {
            value: " a",
            expected: false,
        },
        {
            value: "0",
            expected: false,
        },
        {
            value: 0,
            expected: true,
        },
        {
            value: null,
            expected: true,
        },
        {
            value: undefined,
            expected: true,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${test.value}'`, () => {
            ctx.value = test.value;
            const [isValid] = isEmpty.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
