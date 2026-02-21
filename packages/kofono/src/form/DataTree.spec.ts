import { beforeAll, describe, expect, it } from "vitest";
import { buildSchema } from "../builder/helpers";
import type { Form } from "./Form";

type ScenarioType = {
    selector: string;
    expected: any;
};

describe("DataTree test", () => {
    let form: Form;
    beforeAll(async () => {
        form = await buildSchema({
            __: {
                propA: {
                    type: "string",
                    default: "foo",
                },
                propB: {
                    type: "boolean",
                    default: false,
                },
                propC: {
                    type: "number",
                    default: 0,
                },
                propD: {
                    type: "boolean",
                    default: true,
                },
                propE: {
                    type: "list<string>",
                    default: ["notnull"],
                    items: {
                        type: "string",
                    },
                },
            },
        });
    });

    describe("testing default values", () => {
        const scenarios: ScenarioType[] = [
            {
                selector: "propA",
                expected: "foo",
            },
            {
                selector: "propB",
                expected: false,
            },
            {
                selector: "propC",
                expected: 0,
            },
            {
                selector: "propD",
                expected: true,
            },
            {
                selector: "propE",
                expected: ["notnull"],
            },
        ];

        for (const s of scenarios) {
            it(`default value for ${s.selector} should return correct value (<${typeof s.expected}> "${s.expected}")`, () => {
                expect(form.$d(s.selector)).toEqual(s.expected);
            });
        }
    });
});
