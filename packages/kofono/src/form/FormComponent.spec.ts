import { beforeAll, describe, expect, it } from "vitest";
import { buildSchema } from "../builder/helpers";
import type { Form } from "./Form";
import { FormComponent } from "./FormComponent";

type ScenarioType = {
    selector: string;
    key: string;
    default: any;
    expected: any;
};

describe("FormComponent", () => {
    let form: Form;
    beforeAll(async () => {
        form = await buildSchema({
            __: {
                propA: {
                    type: "string",
                },
                propB: {
                    type: "string",
                    component: {
                        type: "input",
                    },
                },
                propC: {
                    type: "string",
                    default: "foobar",
                    component: {
                        type: "input",
                    },
                },
                propD: {
                    type: "number",
                    default: 0,
                    component: {
                        type: "input",
                    },
                },
                propE: {
                    type: "boolean",
                    default: false,
                    component: {
                        type: "input",
                    },
                },
            },
        });
    });

    describe("given getOrDefault", () => {
        const scenarios: ScenarioType[] = [
            {
                selector: "propA",
                key: "type",
                default: "checkbox",
                expected: "checkbox",
            },
            {
                selector: "propB",
                key: "type",
                default: "checkbox",
                expected: "input",
            },
            {
                selector: "propA",
                key: "title",
                default: "a title",
                expected: "",
            },
            {
                selector: "propA",
                key: "description",
                default: "desc",
                expected: "desc",
            },
        ];

        for (const s of scenarios) {
            it(`${s.selector} should return (<${typeof s.expected}> "${s.expected}")`, () => {
                const component = new FormComponent(form.prop(s.selector));
                expect(component.getOrDefault(s.key, s.default)).toEqual(
                    s.expected,
                );
            });
        }
    });
});
