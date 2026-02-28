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

export type SchemaIsFalseValidator =
    | "isFalse"
    | { isFalse: IsFalseValidatorOpts };

export type IsFalseValidatorOpts = SchemaPropertyBaseValidator;

export function isFalse(expect?: string): SchemaIsFalseValidator {
    return {
        isFalse: {
            ...optional("error", expect),
        },
    };
}

export const isFalseValidator = {
    name: "isFalse" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: IsFalseValidatorOpts,
    ) => new IsFalseValidator(selector, type, opts),
};

export class IsFalseValidator extends AbstractValidator implements Validator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if (ctx.value === false) {
            return this.success();
        }
        return this.error(ValidatorErrors.IsFalse.IsNotFalse);
    }
}
