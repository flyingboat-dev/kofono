import type { SchemaAlphaValidator } from "./alpha/AlphaValidator";
import type { SchemaAlphaNumValidator } from "./alphaNum/AlphaNumValidator";
import type { SchemaBetweenValidator } from "./between/BetweenValidator";
import type { SchemaConditionValidator } from "./condition/ConditionValidator";
import type { SchemaDatetimeValidator } from "./datetime/DatetimeValidator";
import type { SchemaEmailValidator } from "./email/EmailValidator";
import type { SchemaEmptyValidator } from "./empty/EmptyValidator";
import type { SchemaNotEmptyValidator } from "./empty/NotEmptyValidator";
import type { SchemaEqualValidator } from "./equal/EqualValidator";
import type { SchemaNotEqualValidator } from "./equal/NotEqualValidator";
import type { SchemaIfValidator } from "./if/IfValidator";
import type { SchemaIncludesValidator } from "./includes/IncludesValidator";
import type {
    SchemaNotIncludesValidator
} from "./includes/NotIncludesValidator";
import type { SchemaIsFalseValidator } from "./isFalse/IsFalseValidator";
import type { SchemaIsTrueValidator } from "./isTrue/IsTrueValidator";
import type { SchemaIsNotValidValidator } from "./isValid/IsNotValidValidator";
import type { SchemaIsValidValidator } from "./isValid/IsValidValidator";
import type { SchemaMaxValidator } from "./max/MaxValidator";
import type { SchemaMinValidator } from "./min/MinValidator";
import type { SchemaPasswordValidator } from "./password/PasswordValidator";
import type { SchemaRegexpValidator } from "./regexp/RegexpValidator";
import type { SchemaRequiredValidator } from "./required/RequiredValidator";
import type { SchemaUrlValidator } from "./url/UrlValidator";

export type SchemaPropertyBaseValidator = {
    error?: string;
};

export type SchemaPropertyValidator =
    | SchemaAlphaNumValidator
    | SchemaAlphaValidator
    | SchemaBetweenValidator
    | SchemaConditionValidator
    | SchemaDatetimeValidator
    | SchemaEmailValidator
    | SchemaEmptyValidator
    | SchemaEqualValidator
    | SchemaIfValidator
    | SchemaIncludesValidator
    | SchemaIsFalseValidator
    | SchemaIsNotValidValidator
    | SchemaIsTrueValidator
    | SchemaIsValidValidator
    | SchemaMaxValidator
    | SchemaMinValidator
    | SchemaNotEmptyValidator
    | SchemaNotEqualValidator
    | SchemaNotIncludesValidator
    | SchemaPasswordValidator
    | SchemaRegexpValidator
    | SchemaRequiredValidator
    | SchemaUrlValidator;

// validators options and schema builder functions
export * from "./alpha/AlphaValidator";
export * from "./alphaNum/AlphaNumValidator";
export * from "./between/BetweenValidator";
export * from "./condition/ConditionValidator";
export * from "./condition/when";
export * from "./datetime/DatetimeValidator";
export * from "./email/EmailValidator";
export * from "./empty/EmptyValidator";
export * from "./empty/NotEmptyValidator";
export * from "./equal/EqualValidator";
export * from "./equal/NotEqualValidator";
export * from "./if/IfValidator";
export * from "./includes/IncludesValidator";
export * from "./includes/NotIncludesValidator";
export * from "./isFalse/IsFalseValidator";
export * from "./isTrue/IsTrueValidator";
export * from "./isValid/IsNotValidValidator";
export * from "./isValid/IsValidValidator";
export * from "./max/MaxValidator";
export * from "./min/MinValidator";
export * from "./password/PasswordValidator";
export * from "./regexp/RegexpValidator";
export * from "./url/UrlValidator";
