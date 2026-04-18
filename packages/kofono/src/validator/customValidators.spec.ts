import { beforeAll, describe, expect, it } from "vitest";
import { K } from "../builder/K";
import { optional } from "../common/helpers";
import type { FormConfig } from "../form/types";
import { GenericValidator } from "./GenericValidator";
import type {
    SchemaPropertyBaseValidator,
    SchemaPropertyValidator,
} from "./schema";

type CustomValidatorOpts = SchemaPropertyBaseValidator & {
    value: string;
};

// this is a test custom schema function
function custom(value: string, expect?: string): SchemaPropertyValidator {
    return {
        custom: {
            value,
            ...optional("error", expect),
        },
    } as unknown as SchemaPropertyValidator;
}

describe("GenericValidator", () => {
    beforeAll(async () => {});

    it("custom validator basic implementation", async () => {
        const config: Partial<FormConfig> = {
            init: x => {
                x.form.validators.register(
                    "custom",
                    (selector, type) =>
                        new GenericValidator<CustomValidatorOpts>(
                            selector,
                            type,
                            {
                                value: "something",
                            },
                            async v => {
                                return v.error("CUSTOM_ERROR");
                            },
                        ),
                );
            },
        };

        const form = await K.form(
            {
                name: K.string(custom("something")),
            },
            config,
        );

        expect(form.state.validations).toEqual({
            name: [false, "CUSTOM_ERROR"],
        });
    });

    it("shorter custom validator basic implementation", async () => {
        const config: Partial<FormConfig> = {
            init: x => {
                x.addValidator<CustomValidatorOpts>(
                    "custom",
                    async (v, ctx) => {
                        return v.error("CUSTOM_ERROR", {
                            expect: v.opts.value,
                            given: ctx.value,
                        });
                    },
                );
            },
        };

        const form = await K.form(
            {
                name: K.string(custom("something")),
            },
            config,
        );

        expect(form.state.validations).toEqual({
            name: [
                false,
                "CUSTOM_ERROR",
                {
                    expect: "something",
                    given: null,
                },
            ],
        });
    });
});
