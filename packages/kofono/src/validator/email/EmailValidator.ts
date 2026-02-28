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

export type SchemaEmailValidator = "email" | { email: EmailValidatorOpts };

export type EmailValidatorOpts = SchemaPropertyBaseValidator;

export function email(expect?: string) {
    return {
        email: {
            ...optional("error", expect),
        },
    };
}

export const emailValidator = {
    name: "email" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: EmailValidatorOpts,
    ) => new EmailValidator(selector, type, opts),
};

/**
 * Email validator.
 * Note: this validator only checks value look-a-like email, not its validity nor its existence.
 * Precisely, we are looking for a string with one @ and at least one dot after it.
 */
export class EmailValidator extends AbstractValidator implements Validator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if (typeof ctx.value !== "string") {
            return this.error(ValidatorErrors.Email.InvalidType);
        }
        // const regex = /^.*[^@].*@.*[^@].*$/gm;
        // const regex = /^[^@]*@[^@]*\.[^@]*$/gm;
        const regex = /^[a-zA-Z0-9._+-]*@[a-zA-Z0-9._+-]*\.[a-zA-Z0-9._+-]*$/gm;

        if (regex.exec(ctx.value) === null) {
            return this.error(ValidatorErrors.Email.InvalidFormat);
        }
        return this.success();
    }
}
