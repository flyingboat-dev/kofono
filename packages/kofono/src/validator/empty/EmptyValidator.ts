import { isEmptyString, optional } from "../../common/helpers";
import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";

export type SchemaEmptyValidator = "empty" | { empty: EmptyValidatorOpts };

export type EmptyValidatorOpts = SchemaPropertyBaseValidator;

export const emptyValidatorFactory = {
    empty: (selector: string, type: ValidationType, opts: EmptyValidatorOpts) =>
        new EmptyValidator(selector, type, opts),
};

export function empty(expect?: string): SchemaEmptyValidator {
    return {
        empty: {
            ...optional("error", expect),
        },
    };
}

export const emptyValidator = {
    name: "empty" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: EmptyValidatorOpts,
    ) => new EmptyValidator(selector, type, opts),
};

export class EmptyValidator extends AbstractValidator implements Validator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if (!ctx.value) {
            return this.success();
        } else if (typeof ctx.value !== "string") {
            ctx.value = String(ctx.value);
        }

        if (isEmptyString(ctx.value)) {
            return this.success();
        }
        return this.error(ValidatorErrors.Empty.IsNotEmpty);
    }
}
