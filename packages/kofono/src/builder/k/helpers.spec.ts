import { expect, test } from "vitest";
import type { Schema } from "../../schema/Schema";
import type { SchemaPropertiesDeclarations } from "../types";
import {
    schemaToPropertiesDeclarations,
    separate$keysFromProps,
} from "./helpers";
import { PropertyDeclaration } from "./PropertyDeclaration";

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
