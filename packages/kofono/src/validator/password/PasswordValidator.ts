import { optional } from "../../common/helpers";
import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";

export interface SchemaPasswordValidator {
    password: PasswordValidatorOpts;
}

export type PasswordValidatorOpts = SchemaPropertyBaseValidator & {
    min?: number;
    max?: number;
    lowerCase?: boolean;
    upperCase?: boolean;
    numbers?: boolean;
    specialChars?: boolean;
    specialCharsList?: string;
};

export const passwordValidatorFactory = {
    password: (
        selector: string,
        type: ValidationType,
        opts: PasswordValidatorOpts,
    ) => new PasswordValidator(selector, type, opts),
};

export function password(
    opts: PasswordValidatorOpts,
    expect?: string,
): SchemaPasswordValidator {
    return {
        password: opts,
        ...optional("error", expect),
    };
}

export class PasswordValidator extends AbstractValidator implements Validator {
    constructor(
        attachTo: string,
        type: ValidationType,
        public opts: PasswordValidatorOpts,
    ) {
        super(attachTo, type, opts);
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        if (!ctx.value) {
            return this.error(ValidatorErrors.Password.IsEmpty);
        }

        if (
            typeof this.opts.min === "number" &&
            ctx.value.length < this.opts.min
        ) {
            return this.error(ValidatorErrors.Password.MinLength, {
                min: this.opts.min,
            });
        }

        if (
            typeof this.opts.max === "number" &&
            ctx.value.length > this.opts.max
        ) {
            return this.error(ValidatorErrors.Password.MaxLength, {
                max: this.opts.max,
            });
        }

        if (typeof this.opts.lowerCase === "boolean" && this.opts.lowerCase) {
            if (!/[a-z]/.test(ctx.value)) {
                return this.error(ValidatorErrors.Password.NoLowerCase);
            }
        }

        if (typeof this.opts.upperCase === "boolean" && this.opts.upperCase) {
            if (!/[A-Z]/.test(ctx.value)) {
                return this.error(ValidatorErrors.Password.UpperCase);
            }
        }

        if (typeof this.opts.numbers === "boolean" && this.opts.numbers) {
            if (!/[0-9]/.test(ctx.value)) {
                return this.error(ValidatorErrors.Password.Numbers);
            }
        }

        if (
            typeof this.opts.specialChars === "boolean" &&
            this.opts.specialChars
        ) {
            const specialCharsList =
                this.opts.specialCharsList || "!@#$%^&*()_+";
            if (!new RegExp(`[${specialCharsList}]`).test(ctx.value)) {
                return this.error(ValidatorErrors.Password.SpecialChars);
            }
        }

        return this.success();
    }
}
