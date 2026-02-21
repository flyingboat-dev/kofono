import type { SchemaPropertyBaseValidator } from "../schema";

// isValid validator
export const ValidValidatorSchemaToken = "valid";

export type ValidValidatorOpts =
    | string
    | string[]
    | (SchemaPropertyBaseValidator & {
          selectors: string | string[];
      });

export interface SchemaIsValidValidator {
    [ValidValidatorSchemaToken]: ValidValidatorOpts;
}

// isNotValid validator
export const NotValidValidatorSchemaToken = "notValid";

export type NotValidValidatorOpts = ValidValidatorOpts;

export interface SchemaIsNotValidValidator {
    [NotValidValidatorSchemaToken]: NotValidValidatorOpts;
}
