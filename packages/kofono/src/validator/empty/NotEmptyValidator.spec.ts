import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { NotEmptyValidator } from "./NotEmptyValidator";

describe("notEmptyValidator test", () => {
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

    const isNotEmpty = new NotEmptyValidator("test", "validation", {});

    const tests: {
        value: string;
        expected: boolean;
    }[] = [
        {
            value: "",
            expected: false,
        },
        {
            value: " ",
            expected: false,
        },
        {
            value: "        ",
            expected: false,
        },
        {
            value: "a",
            expected: true,
        },
        {
            value: " a",
            expected: true,
        },
        {
            value: "0",
            expected: true,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${test.value}'`, () => {
            ctx.value = test.value;
            const [isValid] = isNotEmpty.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
