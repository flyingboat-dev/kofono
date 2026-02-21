import type { SchemaAlphaValidator } from "./alpha/AlphaValidator";
import type { SchemaAlphaNumValidator } from "./alphaNum/AlphaNumValidator";
import type { SchemaBetweenValidator } from "./between/BetweenValidator";
import type { SchemaConditionValidator } from "./condition/ConditionValidator";
import type { SchemaDatetimeValidator } from "./datetime/DatetimeValidator";
import type { SchemaEmailValidator } from "./email/EmailValidator";
import type { SchemaEmptyValidator } from "./empty/EmptyValidator";
import type { SchemaNotEmptyValidator } from "./empty/NotEmptyValidator";
import type {
    SchemaEqualValidator,
    SchemaNotEqualValidator,
} from "./equal/types";
import type { SchemaIfValidator } from "./if/IfValidator";
import type { SchemaMaxValidator } from "./max/MaxValidator";
import type { SchemaMinValidator } from "./min/MinValidator";
import type { SchemaPasswordValidator } from "./password/PasswordValidator";
import type { SchemaRegexpValidator } from "./regexp/RegexpValidator";
import type { SchemaRequiredValidator } from "./required/RequiredValidator";
import type { SchemaUrlValidator } from "./url/UrlValidator";
import type {
    SchemaIsNotValidValidator,
    SchemaIsValidValidator,
} from "./valid/types";

export type SchemaPropertyBaseValidator = {
    error?: string;
};

export type SchemaPropertyValidator =
    | "alpha"
    | "alphaNum"
    | "email"
    | "empty"
    | "notEmpty"
    | "required"
    | "url"
    | SchemaAlphaNumValidator
    | SchemaAlphaValidator
    | SchemaBetweenValidator
    | SchemaConditionValidator
    | SchemaDatetimeValidator
    | SchemaEmailValidator
    | SchemaEmptyValidator
    | SchemaEqualValidator
    | SchemaIfValidator
    | SchemaIsNotValidValidator
    | SchemaIsValidValidator
    | SchemaMaxValidator
    | SchemaMinValidator
    | SchemaNotEmptyValidator
    | SchemaNotEqualValidator
    | SchemaPasswordValidator
    | SchemaRegexpValidator
    | SchemaRequiredValidator
    | SchemaUrlValidator;

// export { SchemaAlphaValidator };
// export { SchemaAlphaNumValidator };
// export { SchemaBetweenValidator };
// export { SchemaEmailValidator };
// export { SchemaEqualValidator };
// export { SchemaIsValidValidator };
// export { SchemaIsNotValidValidator };
// export { SchemaNotEmptyValidator };
// export { SchemaNotEqualValidator };
// export { SchemaMaxValidator };
// export { SchemaMinValidator };
// export { SchemaPasswordValidator };
// export { SchemaRegexpValidator };
// export { SchemaDatetimeValidator };
// export { SchemaUrlValidator };
// export { SchemaValueValidator };
// export interface SchemaFnValidator {
//     fn: string | { expression: string };
// }

// export type SchemaPropertyValidatorDefinition = {
//     v: SchemaPropertyValidators;
//     condition?: string;
//     errorMessage?: string;
// };
