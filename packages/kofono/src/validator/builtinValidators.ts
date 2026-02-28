import * as Alpha from "./alpha/AlphaValidator";
import * as AlphaNum from "./alphaNum/AlphaNumValidator";
import * as Between from "./between/BetweenValidator";
import * as Condition from "./condition/ConditionValidator";
import * as Datetime from "./datetime/DatetimeValidator";
import * as Email from "./email/EmailValidator";
import * as Empty from "./empty/EmptyValidator";
import * as NotEmpty from "./empty/NotEmptyValidator";
import * as Equal from "./equal/EqualValidator";
import * as NotEqual from "./equal/NotEqualValidator";
import * as If from "./if/IfValidator";
import * as IsFalse from "./isFalse/IsFalseValidator";
import * as IsTrue from "./isTrue/IsTrueValidator";
import * as Max from "./max/MaxValidator";
import * as Min from "./min/MinValidator";
import * as Password from "./password/PasswordValidator";
import * as Regexp from "./regexp/RegexpValidator";
import * as Required from "./required/RequiredValidator";
import type { ValidatorFactoryHandler } from "./types";
import * as Url from "./url/UrlValidator";
import * as NotValid from "./valid/NotValidValidator";
import * as Valid from "./valid/ValidValidator";

export const builtinValidators = [
    Alpha.alphaValidator,
    AlphaNum.alphaNumValidator,
    Between.betweenValidator,
    Condition.conditionValidator,
    Datetime.datetimeValidator,
    Email.emailValidator,
    Empty.emptyValidator,
    Equal.equalValidator,
    If.ifValidator,
    IsFalse.isFalseValidator,
    IsTrue.isTrueValidator,
    Max.maxValidator,
    Min.minValidator,
    NotEmpty.notEmptyValidator,
    NotEqual.notEqualValidator,
    NotValid.notValidValidator,
    Password.passwordValidator,
    Regexp.regexpValidator,
    Required.requiredValidator,
    Url.urlValidator,
    Valid.validValidator,
] as const;

export const builtinValidatorFactories: Record<
    string,
    ValidatorFactoryHandler
> = Object.fromEntries(builtinValidators.map(v => [v.name, v.factory]));
