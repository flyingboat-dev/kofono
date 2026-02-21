import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { EmailValidator } from "./EmailValidator";

describe("emailValidator test", () => {
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

    const validator = new EmailValidator("test", "validation", {});

    const tests: {
        value: string;
        expected: boolean;
        error?: string;
    }[] = [
        {
            expected: false,
            value: "",
        },
        {
            expected: false,
            value: " ",
        },
        {
            expected: false,
            value: "       ",
        },
        {
            expected: false,
            value: "a",
        },
        {
            expected: false,
            value: " a",
        },
        {
            expected: false,
            value: "0",
        },
        {
            expected: false,
            value: "@",
        },
        {
            expected: false,
            value: "@t",
        },
        {
            expected: false,
            value: "t@",
        },
        {
            expected: false,
            value: "t@t",
        },
        {
            expected: false,
            value: "bob+1@t.tt@test",
        },
        {
            expected: false,
            value: "bob {}@t.tt",
        },
        {
            expected: true,
            value: "test@domain.tld",
        },
        {
            expected: true,
            value: "t@t.t",
        },
        {
            expected: true,
            value: "t_t-a.t+3@t.tt",
        },
        {
            expected: true,
            value: "t@t.tt.c",
        },
        {
            expected: true,
            value: "bob+1@t.tt",
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${test.value}'`, () => {
            ctx.value = test.value;
            const [isValid] = validator.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
