import type { Schema } from "../../../src/schema/Schema";

export const allTypes: Schema = {
    $id: "allTypes",
    __: {
        prop1: {
            type: "string",
        },
        prop2: {
            type: "number",
        },
        prop3: {
            type: "boolean",
        },
        prop4: {
            type: "null",
        },
        prop5: {
            type: "object",
            __: {
                propA: {
                    type: "string",
                },
            },
        },
        prop6: {
            type: "array",
            items: {
                type: "string",
            },
        },
        prop7: {
            type: "list<boolean>",
        },
        prop8: {
            type: "list<mixed>",
        },
        prop9: {
            type: "list<number>",
        },
        prop10: {
            type: "list<string>",
        },
    },
};

export const allTypesYaml = `
__:
    propA:
        type: "string"
        $v: ["notEmpty"]
    propB:
        type: "number"
        $q:
            - isValid: "propA"
    propC:
        type: "boolean"
    propD:
        type: "null"
    propE:
        type: "object"
        __:
            propE1:
                type: "string"
    propF:
        type: "array"
        items:
            type: "string"
`;
