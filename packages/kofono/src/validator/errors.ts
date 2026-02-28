function validatorPrefix(p: string): string {
    return `_validator.${p}`;
}

export const ValidatorErrors = {
    Alpha: {
        InvalidType: validatorPrefix("alpha.invalidType"),
        InvalidChar: validatorPrefix("alpha.invalidChar"),
    },

    AlphaNum: {
        InvalidType: validatorPrefix("alphaNum.invalidType"),
        InvalidChar: validatorPrefix("alphaNum.invalidChar"),
    },

    Between: {
        InvalidType: validatorPrefix("between.invalidType"),
        BelowMin: validatorPrefix("between.belowMin"),
        BelowLengthMin: validatorPrefix("between.belowLengthMin"),
        AboveMax: validatorPrefix("between.aboveMax"),
        AboveLengthMax: validatorPrefix("between.aboveLengthMax"),
    },

    Condition: {
        IsFailing: validatorPrefix("exp.isFailing"),
    },

    Datetime: {
        InvalidType: validatorPrefix("datetime.invalidType"),
        InvalidFormat: validatorPrefix("datetime.invalidFormat"),
        InvalidValue: validatorPrefix("datetime.invalidValue"),
        BeforeMin: validatorPrefix("datetime.beforeMin"),
        AfterMax: validatorPrefix("datetime.afterMax"),
    },

    Email: {
        InvalidType: validatorPrefix("email.invalidType"),
        InvalidFormat: validatorPrefix("email.invalidFormat"),
    },

    Empty: {
        IsNotEmpty: validatorPrefix("empty.isNotEmpty"),
    },

    Equal: {
        IsNotEqual: validatorPrefix("equal.isNotEqual"),
    },

    IsFalse: {
        IsNotFalse: validatorPrefix("isFalse.isNotFalse"),
    },

    IsTrue: {
        IsNotTrue: validatorPrefix("isTrue.isNotTrue"),
    },

    Max: {
        InvalidType: validatorPrefix("max.invalidType"),
        AboveMax: validatorPrefix("max.aboveMax"),
    },

    Min: {
        InvalidType: validatorPrefix("min.invalidType"),
        BelowMin: validatorPrefix("min.belowMin"),
    },

    NotEmpty: {
        IsEmpty: validatorPrefix("notEmpty.isEmpty"),
    },

    NotEqual: {
        IsEqual: validatorPrefix("notEqual.isEqual"),
    },

    IsNotValid: {
        SelectorNotFound: validatorPrefix("isNotValid.selectorNotFound"),
        SelectorValid: validatorPrefix("isNotValid.selectorValid"),
    },

    Password: {
        IsEmpty: validatorPrefix("password.isEmpty"),
        MinLength: validatorPrefix("password.minLength"),
        MaxLength: validatorPrefix("password.maxLength"),
        NoLowerCase: validatorPrefix("password.noLowerCase"),
        UpperCase: validatorPrefix("password.upperCase"),
        Numbers: validatorPrefix("password.numbers"),
        SpecialChars: validatorPrefix("password.specialChars"),
    },

    Regexp: {
        InvalidType: validatorPrefix("regexp.invalidType"),
        NotMatching: validatorPrefix("regexp.notMatching"),
    },

    Required: {
        IsRequired: validatorPrefix("required.isRequired"),
    },

    Url: {
        InvalidFormat: validatorPrefix("url.invalidFormat"),
        InvalidType: validatorPrefix("url.invalidType"),
        ProtocolUnallowed: validatorPrefix("url.protocolUnallowed"),
        HostnameUnallowed: validatorPrefix("url.hostnameUnallowed"),
    },

    IsValid: {
        SelectorNotFound: validatorPrefix("isValid.selectorNotFound"),
        SelectorNotValid: validatorPrefix("isValid.selectorNotValid"),
    },

    Value: {
        IsNotEqual: validatorPrefix("value.isNotEqual"),
        IsEqual: validatorPrefix("value.isEqual"),
        ComparisonNotSupported: validatorPrefix("value.comparisonNotSupported"),
        ValueNotGreater: validatorPrefix("value.valueNotGreater"),
        ValueNotGreaterOrEqual: validatorPrefix("value.valueNotGreaterOrEqual"),
        ValueNotLess: validatorPrefix("value.valueNotLess"),
        ValueNotLessOrEqual: validatorPrefix("value.valueNotLessOrEqual"),
    },
} as const;
