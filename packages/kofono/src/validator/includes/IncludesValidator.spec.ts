import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../../builder/SchemaBuilder";
import type { Form } from "../../form/Form";
import type { ValidationContext } from "../types";
import { IncludesValidator } from "./IncludesValidator";

describe("IncludesValidator test", () => {
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

    const includes = new IncludesValidator("test", "validation", {
        value: "hello",
    });

    const tests: {
        value: any;
        expected: boolean;
    }[] = [
        {
            value: "hello world",
            expected: true,
        },
        {
            value: "say hello",
            expected: true,
        },
        {
            value: "world",
            expected: false,
        },
        {
            value: ["hello", "world"],
            expected: true,
        },
        {
            value: [1, 333, "hello"],
            expected: true,
        },
        {
            value: ["world"],
            expected: false,
        },
        {
            value: "",
            expected: false,
        },
        {
            value: 123,
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
            value: { hello: "world" },
            expected: false,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} for '${String(test.value)}'`, () => {
            ctx.value = test.value;
            const [isValid] = includes.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
