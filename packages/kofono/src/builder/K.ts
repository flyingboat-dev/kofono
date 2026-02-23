/** biome-ignore-all lint/complexity/noStaticOnlyClass: i like it that way */

import { optional } from "../common/helpers";
import { defaultConfig } from "../form/defaults";
import type { Form } from "../form/Form";
import type { FormConfig } from "../form/types";
import { PropertyType } from "../property/types";
import type {
    Schema,
    SchemaProperties,
    SchemaProperty,
} from "../schema/Schema";
import { Token } from "../schema/Tokens";
import type { SchemaPropertyValidator } from "../validator/schema";
import { buildSchema } from "./helpers";
import {
    schemaToPropertiesDeclarations,
    separate$keysFromProps,
} from "./k/helpers";
import { PropertyDeclaration } from "./k/PropertyDeclaration";
import type { SchemaPropertiesDeclarations } from "./types";

export class K {
    public static async form(
        def: SchemaPropertiesDeclarations,
        config: Partial<FormConfig> = defaultConfig,
    ): Promise<Form> {
        config = {
            ...defaultConfig,
            ...config,
        };
        return await buildSchema(K.schema(def), config as FormConfig);
    }

    public static schema(def: SchemaPropertiesDeclarations): Schema {
        const [props, opts] = separate$keysFromProps(def);
        const innerBody = K.object(props);
        return {
            ...optional(Token.SchemaId, opts[Token.SchemaId]),
            ...optional(Token.SchemaVars, opts[Token.SchemaVars]),
            ...optional(Token.SchemaPlugins, opts[Token.SchemaPlugins]),
            ...optional(
                Token.SchemaTranslations,
                opts[Token.SchemaTranslations],
            ),
            __: innerBody.def.__ as SchemaProperties,
        };
    }

    public static extendsSchema(
        schema: Schema,
        def: SchemaPropertiesDeclarations,
    ): Schema {
        const declarations = schemaToPropertiesDeclarations(schema);
        return K.schema({
            ...declarations,
            ...def,
        });
    }

    public static object(
        content: Record<string, PropertyDeclaration>,
    ): PropertyDeclaration {
        const schema: Record<string, SchemaProperty> = {};
        for (const [key, prop] of Object.entries(content)) {
            schema[key] = prop.def;
        }

        return new PropertyDeclaration({
            type: PropertyType.Object,
            [Token.Properties]: schema,
        });
    }

    public static raw(def: SchemaProperty): PropertyDeclaration {
        return new PropertyDeclaration(def);
    }

    public static string(
        validators: SchemaPropertyValidator | SchemaPropertyValidator[] = [],
    ): PropertyDeclaration<string> {
        // todo: modify the others methods with this
        return K.propWithValidations(PropertyType.String, validators);
    }

    public static number(): PropertyDeclaration<number> {
        return new PropertyDeclaration({
            type: PropertyType.Number,
        });
    }

    public static boolean(): PropertyDeclaration<boolean> {
        return new PropertyDeclaration({
            type: PropertyType.Boolean,
        });
    }

    public static array(
        items: PropertyDeclaration,
    ): PropertyDeclaration<Array<any>> {
        return new PropertyDeclaration({
            type: PropertyType.Array,
            items: items.def,
        });
    }

    public static listBoolean(): PropertyDeclaration<boolean[]> {
        return new PropertyDeclaration({
            type: PropertyType.ListBoolean,
        });
    }

    public static listNumber(): PropertyDeclaration<number[]> {
        return new PropertyDeclaration({
            type: PropertyType.ListNumber,
        });
    }

    public static listString(): PropertyDeclaration<string[]> {
        return new PropertyDeclaration({
            type: PropertyType.ListString,
        });
    }

    public static listMixed(): PropertyDeclaration<any[]> {
        return new PropertyDeclaration({
            type: PropertyType.ListMixed,
        });
    }

    public static null(): PropertyDeclaration<never> {
        return new PropertyDeclaration({
            type: PropertyType.Null,
        });
    }

    private static propWithValidations<T>(
        type: PropertyType,
        validators: SchemaPropertyValidator | SchemaPropertyValidator[] = [],
    ): PropertyDeclaration<T> {
        const prop = new PropertyDeclaration({ type } as SchemaProperty);
        if (!Array.isArray(validators)) {
            validators = [validators];
        }
        if (validators.length > 0) {
            prop.set("$v", validators);
        }
        return prop;
    }
}
