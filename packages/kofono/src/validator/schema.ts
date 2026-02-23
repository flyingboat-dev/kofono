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
import type { SchemaMaxValidator } from "./max/MaxValidator";
import type { SchemaMinValidator } from "./min/MinValidator";
import type { SchemaPasswordValidator } from "./password/PasswordValidator";
import type { SchemaRegexpValidator } from "./regexp/RegexpValidator";
import type { SchemaRequiredValidator } from "./required/RequiredValidator";
import type { SchemaUrlValidator } from "./url/UrlValidator";
import type { SchemaIsNotValidValidator } from "./valid/NotValidValidator";
import type { SchemaIsValidValidator } from "./valid/ValidValidator";

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

export { AlphaValidatorOpts, alpha } from "./alpha/AlphaValidator";
export { AlphaNumValidatorOpts, alphaNum } from "./alphaNum/AlphaNumValidator";
export { BetweenValidatorOpts, between } from "./between/BetweenValidator";
export {
    ConditionValidatorOpts,
    condition,
} from "./condition/ConditionValidator";
export { DatetimeValidatorOpts, datetime } from "./datetime/DatetimeValidator";
export { EmailValidatorOpts, email } from "./email/EmailValidator";
export { NotEmptyValidatorOpts, notEmpty } from "./empty/NotEmptyValidator";
export { EqualValidatorOpts, equal } from "./equal/EqualValidator";
export { NotEqualValidatorOpts, notEqual } from "./equal/NotEqualValidator";
export { IfValidatorOpts, when } from "./if/IfValidator";
export { MaxValidatorOpts, max } from "./max/MaxValidator";
export { MinValidatorOpts, min } from "./min/MinValidator";
export { PasswordValidatorOpts, password } from "./password/PasswordValidator";
export { RegexValidatorOpts, regexp } from "./regexp/RegexpValidator";
export { UrlValidatorOpts, url } from "./url/UrlValidator";
export { NotValidValidatorOpts, notValid } from "./valid/NotValidValidator";
export { ValidValidatorOpts, valid } from "./valid/ValidValidator";
