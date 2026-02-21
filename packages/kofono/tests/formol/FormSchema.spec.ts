import { beforeAll, describe, it } from "vitest";
import { buildSchema, type Form, type Schema } from "../../src";

const schema1: Schema = {
    $id: "schema1",
    __: {
        propA: {
            type: "string",
            $v: [
                {
                    notEmpty: {
                        error: "errors_csussstossms23s",
                    },
                },
                // {
                //     rangeNumber: {
                //         min: 0,
                //         max: 102,
                //         error: "errssssssssssor"
                //     }
                // }
            ],
        },
    },
};

describe("Test various form schema", () => {
    let form: Form;
    beforeAll(async () => {
        form = await buildSchema(schema1);
    });

    it("events", async () => {
        await form.update("propA", "");
    });
});
