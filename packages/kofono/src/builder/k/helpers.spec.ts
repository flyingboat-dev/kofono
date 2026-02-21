import { expect, test } from "vitest";
import type { Schema } from "../../schema/Schema";
import type { SchemaPropertiesDeclarations } from "../types";
import {
    optional,
    schemaToPropertiesDeclarations,
    separate$keysFromProps,
} from "./helpers";
import { PropertyDeclaration } from "./PropertyDeclaration";

test("optional()", () => {
    const tests: {
        key: string;
        value: any;
        expected: Record<string, any>;
    }[] = [
        {
            key: "test",
            value: undefined,
            expected: {},
        },
        {
            key: "test",
            value: null,
            expected: {
                test: null,
            },
        },
        {
            key: "test",
            value: 123,
            expected: {
                test: 123,
            },
        },
        {
            key: "test",
            value: "abc",
            expected: {
                test: "abc",
            },
        },
        {
            key: "test",
            value: [],
            expected: {
                test: [],
            },
        },
        {
            key: "test",
            value: {},
            expected: {
                test: {},
            },
        },
        {
            key: "test",
            value: true,
            expected: {
                test: true,
            },
        },
        {
            key: "test",
            value: false,
            expected: {
                test: false,
            },
        },
        {
            key: "test",
            value: 0,
            expected: {
                test: 0,
            },
        },
        {
            key: "test",
            value: NaN,
            expected: {
                test: NaN,
            },
        },
    ];

    for (const { key, value, expected } of tests) {
        const result = optional(key, value);
        expect(result).toEqual(expected);
    }
});

test("separate$keysFromProps()", () => {
    const props: SchemaPropertiesDeclarations = {
        $id: "test",
        $vars: {
            name: "foo",
        },
        $plugins: [],
        $special: "specialValue",
        propA: new PropertyDeclaration({
            type: "string",
        }),
        propB: new PropertyDeclaration({
            type: "string",
        }),
    };

    const [properties, schemaOptions] = separate$keysFromProps(props);

    expect(Object.keys(properties)).toEqual(["propA", "propB"]);

    expect(Object.keys(schemaOptions)).toEqual([
        "$id",
        "$vars",
        "$plugins",
        "$special",
    ]);
});

test("schemaToPropertiesDeclarations()", () => {
    const schema: Schema = {
        $id: "testSchema",
        $vars: {
            name: "foo",
        },
        $plugins: [],
        __: {
            propA: {
                type: "string",
            },
            propB: {
                type: "string",
            },
        },
    };

    const t = schemaToPropertiesDeclarations(schema);
    expect(t).toEqual({
        $id: "testSchema",
        $vars: {
            name: "foo",
        },
        $plugins: [],
        propA: new PropertyDeclaration({
            type: "string",
        }),
        propB: new PropertyDeclaration({
            type: "string",
        }),
    });
});
