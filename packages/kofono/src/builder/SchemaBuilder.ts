import * as YAML from "yaml";
import { isObjectLiteral } from "../common/helpers";
import { defaultConfig } from "../form/defaults";
import type { Form } from "../form/Form";
import type { FormConfig, Properties } from "../form/types";
import type { PluginsFactory } from "../plugins/PluginsFactory";
import type { Plugins } from "../plugins/types";
import { PropertyType } from "../property/types";
import type {
    Schema,
    SchemaProperties,
    SchemaProperty,
} from "../schema/Schema";
import { Token } from "../schema/Tokens";
import { DataSelector } from "../selector/DataSelector";
import { joinSelectors } from "../selector/helpers";
import { Builder } from "./Builder";

export const SchemaBuilderError = {
    InvalidPropertyKeyName: `Property key {key} cannot contain "${DataSelector.separator}" (dot)`,
    InvalidPropertyValue: `Property {key} is undefined in schema`,
    MissingRootProperties: `Schema must have a root properties key "${Token.Properties}"`,
    UnknownPropertyType: `Unknown type {type}`,
} as const;

/**
 * Build a form instance from schema
 */
export class SchemaBuilder {
    async build(
        schema: Schema,
        config: Partial<FormConfig> = {},
    ): Promise<Form> {
        return await this._build(schema, config);
    }

    async buildFromYaml(
        yaml: string,
        config: Partial<FormConfig> = {},
    ): Promise<Form> {
        const schema = YAML.parse(yaml);
        return await this._build(schema, config);
    }

    async buildEmpty(config: Partial<FormConfig> = {}): Promise<Form> {
        return this._build(
            {
                __: {},
            },
            config,
        );
    }

    private async _build(
        schema: Schema,
        config: Partial<FormConfig>,
    ): Promise<Form> {
        const builder = new Builder();
        if (!schema.__) {
            throw new Error(SchemaBuilderError.MissingRootProperties);
        }
        this.processProps(builder, schema.__, "root");

        const finalConfig = this.processConfig(schema, config);
        finalConfig.plugins = this.buildPlugins(
            schema[Token.SchemaPlugins],
            finalConfig.pluginsFactory,
        );

        return await builder.build(finalConfig);
    }

    public buildPlugins(
        schemaPlugins: Schema[Token.SchemaPlugins],
        pluginsFactory: PluginsFactory,
    ): Plugins {
        if (!schemaPlugins) {
            return [];
        }

        const plugins: Plugins = [];

        for (const plugin of schemaPlugins) {
            const keys = Object.keys(plugin);
            let name: string = "";
            if (keys.length === 1) {
                name = keys[0];
            }

            if (pluginsFactory.has(name)) {
                const factory = pluginsFactory.get(name);
                plugins.push(factory(plugin[name]));
            }
        }

        return plugins;
    }

    public buildProp(
        id: string,
        prop: SchemaProperty,
        parentUid: string,
    ): Properties {
        const builder = new Builder();
        this.processProp(id, builder, prop, parentUid);
        return builder.buildProps();
    }

    private processConfig(
        schema: Schema,
        config: Partial<FormConfig>,
    ): FormConfig {
        const finalConfig = Object.assign(defaultConfig, config);
        finalConfig.vars = Object.assign(
            schema[Token.SchemaVars] || {},
            finalConfig.vars || {},
        );
        finalConfig.id = finalConfig.id || schema[Token.SchemaId] || "";
        return finalConfig;
    }

    private processProps(
        builder: Builder,
        schema: SchemaProperties,
        parentUid: string,
    ) {
        for (const [propId, prop] of Object.entries(schema)) {
            if (typeof propId !== "string") {
                continue;
            }

            if (!isObjectLiteral(prop)) {
                throw new Error(
                    SchemaBuilderError.InvalidPropertyValue.replace(
                        "{key}",
                        propId,
                    ),
                );
            } else if ("type" in prop) {
                this.processProp(propId, builder, prop, parentUid);
            }
        }
    }

    private processProp(
        key: string,
        builder: Builder,
        prop: SchemaProperty,
        parentUid: string,
    ) {
        if (key.includes(DataSelector.separator)) {
            throw new Error(
                SchemaBuilderError.InvalidPropertyKeyName.replace("{key}", key),
            );
        }

        const selector = this.joinSelectors(parentUid, key);
        switch (prop.type) {
            case PropertyType.Array:
                return builder.array(selector, prop);
            case PropertyType.ListBoolean:
                return builder.listBoolean(selector, prop);
            case PropertyType.ListMixed:
                return builder.listMixed(selector, prop);
            case PropertyType.ListNumber:
                return builder.listNumber(selector, prop);
            case PropertyType.ListString:
                return builder.listString(selector, prop);
            case PropertyType.Boolean:
                return builder.boolean(selector, prop);
            case PropertyType.Object:
                builder.object(selector, prop);
                return this.processProps(builder, prop.__, selector);
            case PropertyType.Null:
                return builder.null(selector, prop);
            case PropertyType.Number:
                return builder.number(selector, prop);
            case PropertyType.String:
                return builder.string(selector, prop);
        }

        throw new Error(
            SchemaBuilderError.UnknownPropertyType.replace("{type}", prop.type),
        );
    }

    private joinSelectors(parentSelector: string, selector: string): string {
        if (parentSelector === "root" || parentSelector === "") {
            return selector;
        }
        return joinSelectors(parentSelector, selector);
    }
}
