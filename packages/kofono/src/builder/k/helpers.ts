import type { Schema } from "../../schema/Schema";
import { Token } from "../../schema/Tokens";
import type { SchemaPropertiesDeclarations } from "../types";
import { PropertyDeclaration } from "./PropertyDeclaration";

export function separate$keysFromProps(
    props: SchemaPropertiesDeclarations,
): [
    props: Record<string, PropertyDeclaration>,
    schemaOptions: Partial<Omit<Schema, "__">>,
] {
    const properties: Record<string, PropertyDeclaration> = {};
    const schemaOptions: Partial<Omit<Schema, "__">> = {};
    for (const [key, val] of Object.entries(props)) {
        if (key.startsWith("$")) {
            schemaOptions[key] = val;
        } else {
            properties[key] = val as PropertyDeclaration;
        }
    }
    return [properties, schemaOptions];
}

export function schemaToPropertiesDeclarations(
    schema: Schema,
): SchemaPropertiesDeclarations {
    const properties: SchemaPropertiesDeclarations = {};
    for (const [key, prop] of Object.entries(schema.__)) {
        properties[key] = new PropertyDeclaration(prop);
    }
    if (schema.$id) {
        properties.$id = schema.$id;
    }
    if (schema.$vars) {
        properties.$vars = schema.$vars;
    }
    if (schema.$plugins) {
        properties.$plugins = schema.$plugins;
    }
    if (schema[Token.SchemaTranslations]) {
        properties[Token.SchemaTranslations] = schema[Token.SchemaTranslations];
    }
    return properties;
}
