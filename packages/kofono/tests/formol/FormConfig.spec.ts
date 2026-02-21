import { beforeAll, describe, expect, it } from "vitest";
import {
    defaultConfig,
    type Form,
    type InlineSchema,
    SchemaBuilder,
    ValidatorsFactory,
} from "../../src";
import { CustomValidator } from "../_fixtures/validators/CustomValidator";

describe("FormConfig test", () => {
    let form: Form;

    beforeAll(async () => {
        const validatorsFactory = new ValidatorsFactory();
        validatorsFactory.register(
            "myCustomValidator",
            (selector, type) => new CustomValidator(selector, type),
        );

        form = await new SchemaBuilder().build(
            {
                __: {
                    propA: {
                        type: "string",
                        $v: ["myCustomValidator"],
                    },
                },
            } as InlineSchema,
            {
                ...defaultConfig,
                validatorsFactory,
            },
        );
    });

    it("should register custom validator", () => {
        expect(form.$v("propA")).toEqual([false, "NOT_BOB"]);
        expect("test").not.toBeNull();
    });
});
