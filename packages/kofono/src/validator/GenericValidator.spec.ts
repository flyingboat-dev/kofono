import { beforeAll, describe, expect, it } from "vitest";
import { SchemaBuilder } from "../builder/SchemaBuilder";
import type { Form } from "../form/Form";
import { GenericValidator } from "./GenericValidator";
import type { ValidationContext, ValidatorFn } from "./types";

describe("GenericValidator", () => {
    let form: Form;
    let ctx: ValidationContext;
    beforeAll(async () => {
        form = await new SchemaBuilder().buildEmpty();
        ctx = {
            selector: "selector",
            value: "",
            form: form,
        };
    });

    // just a simple useless validator to test the GenericValidator
    const validator: ValidatorFn = async (self, _, ctx) => {
        if (ctx.value === "valid") {
            return self.success();
        }
        return self.error("INVALID_VALUE");
    };

    const genericValidator = new GenericValidator(
        "test",
        "validation",
        {},
        validator,
    );

    const tests: {
        data: any;
        expected: boolean;
    }[] = [
        {
            data: "something",
            expected: false,
        },
        {
            data: null,
            expected: false,
        },
        {
            data: undefined,
            expected: false,
        },
        {
            data: "valid",
            expected: true,
        },
    ];

    for (const test of tests) {
        it(`should return ${test.expected} when '${test.data}' === 'valid'`, async () => {
            ctx.value = test.data;
            const [isValid] = await genericValidator.validate(ctx);
            expect(isValid).toEqual(test.expected);
        });
    }
});
