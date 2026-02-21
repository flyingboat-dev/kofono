import type { Form } from "../form/Form";
import type { SchemaPlugin } from "../plugins/types";
import type { Property } from "../property/Property";
import type { Schema, SchemaProperty } from "../schema/Schema";
import type { Token } from "../schema/Tokens";
import type { PropertyDeclaration } from "./k/PropertyDeclaration";

export interface PropertyBuilder<TSchemaType extends SchemaProperty> {
    buildProperty(): Property<TSchemaType>;
}

export interface PluginBuilder<TPlugin extends SchemaPlugin> {
    buildPlugin(): Promise<TPlugin>;
}

export type SchemaBuildResult =
    | SchemaBuildResultSucceed
    | SchemaBuildResultFailed;

export type SchemaBuildResultSucceed = {
    error: undefined;
    form: Form;
};

export type SchemaBuildResultFailed = {
    error: Error;
    form: undefined;
};

export interface SchemaPropertiesDeclarations {
    $id?: Schema[Token.SchemaId];
    $vars?: Schema[Token.SchemaVars];
    $plugins?: Schema[Token.SchemaPlugins];
    $translations?: Schema[Token.SchemaTranslations];
    [
        key: Exclude<
            string,
            | Token.SchemaId
            | Token.SchemaVars
            | Token.SchemaPlugins
            | Token.SchemaTranslations
        >
    ]:
        | PropertyDeclaration
        | Schema[Token.SchemaId]
        | Schema[Token.SchemaVars]
        | Schema[Token.SchemaPlugins]
        | Schema[Token.SchemaTranslations];
}
