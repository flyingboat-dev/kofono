import { alphaValidatorFactory } from "./alpha/AlphaValidator";
import { alphaNumValidatorFactory } from "./alphaNum/AlphaNumValidator";
import { betweenValidatorFactory } from "./between/BetweenValidator";
import { conditionValidatorFactory } from "./condition/ConditionValidator";
import { datetimeValidatorFactory } from "./datetime/DatetimeValidator";
import { emailValidatorFactory } from "./email/EmailValidator";
import { emptyValidatorFactory } from "./empty/EmptyValidator";
import { notEmptyValidatorFactory } from "./empty/NotEmptyValidator";
import { equalValidatorFactory } from "./equal/EqualValidator";
import { notEqualValidatorFactory } from "./equal/NotEqualValidator";
import { ifValidatorFactory } from "./if/IfValidator";
import { maxValidatorFactory } from "./max/MaxValidator";
import { minValidatorFactory } from "./min/MinValidator";
import { passwordValidatorFactory } from "./password/PasswordValidator";
import { regexpValidatorFactory } from "./regexp/RegexpValidator";
import { requiredValidatorFactory } from "./required/RequiredValidator";
import type { ValidatorFactoryHandler } from "./types";
import { urlValidatorFactory } from "./url/UrlValidator";
import { notValidValidatorFactory } from "./valid/NotValidValidator";
import { validValidatorFactory } from "./valid/ValidValidator";

export const defaultValidatorsFactory: Record<string, ValidatorFactoryHandler> =
    {
        ...alphaNumValidatorFactory,
        ...alphaValidatorFactory,
        ...betweenValidatorFactory,
        ...conditionValidatorFactory,
        ...datetimeValidatorFactory,
        ...emailValidatorFactory,
        ...emptyValidatorFactory,
        ...equalValidatorFactory,
        ...ifValidatorFactory,
        ...maxValidatorFactory,
        ...minValidatorFactory,
        ...notEmptyValidatorFactory,
        ...notEqualValidatorFactory,
        ...notValidValidatorFactory,
        ...passwordValidatorFactory,
        ...regexpValidatorFactory,
        ...requiredValidatorFactory,
        ...urlValidatorFactory,
        ...validValidatorFactory,
    };
