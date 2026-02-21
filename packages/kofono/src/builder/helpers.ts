import { defaultConfig } from "../form/defaults";
import type { Form } from "../form/Form";
import type { FormConfig } from "../form/types";
import type { Schema } from "../schema/Schema";
import { SchemaBuilder } from "./SchemaBuilder";
import type { SchemaBuildResult } from "./types";

/**
 * Build a form instance from Schema object or a json string
 * @exception Throws an error if the schema is not valid
 */
export async function buildSchema(
    schema: Schema | string,
    config: FormConfig = defaultConfig,
): Promise<Form> {
    if (typeof schema === "string") {
        return await new SchemaBuilder().buildFromYaml(schema, config);
    }
    return await new SchemaBuilder().build(schema, config);
}

/**
 * Build a form instance from an empty schema, mainly used for testing
 */
export async function buildEmptySchema(): Promise<Form> {
    return await new SchemaBuilder().buildEmpty();
}

/**
 * Tries to build a Form instance from a given schema and configuration.
 * This function is a safe version of `buildSchema` that catches any errors that might occur during the build process.
 * If the build is successful, it returns an object with the built Form instance and `Error` as `undefined`.
 * If an error occurs, it returns an object with `Form` as `undefined` and the caught `Error`.
 * @return SchemaBuildResult
 */
export async function tryBuildSchema(
    schema: Schema | string,
    config: FormConfig = defaultConfig,
): Promise<SchemaBuildResult> {
    try {
        return {
            error: undefined,
            form: await buildSchema(schema, config),
        };
    } catch (e: any) {
        return {
            error: e as Error,
            form: undefined,
        };
    }
}
