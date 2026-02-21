import type { SchemaPropertyBaseValidator } from "../schema";

// equal validator
export const EqualValidatorSchemaToken = "equal";

export type EqualValidatorOpts = SchemaPropertyBaseValidator & {
    value: string | number | boolean | null;
    caseSensitive?: boolean;
};

export interface SchemaEqualValidator {
    [EqualValidatorSchemaToken]: EqualValidatorOpts;
}

// not equal validator
export const NotEqualValidatorSchemaToken = "notEqual";

export type NotEqualValidatorOpts = SchemaPropertyBaseValidator & {
    value: EqualValidatorOpts["value"];
    caseSensitive?: boolean;
};

export interface SchemaNotEqualValidator {
    [NotEqualValidatorSchemaToken]: NotEqualValidatorOpts;
}
