import { isEmptyString } from "../../common/helpers";
import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";

export interface SchemaNotEmptyValidator {
    notEmpty: NotEmptyValidatorOpts;
}

export type NotEmptyValidatorOpts = SchemaPropertyBaseValidator;

export const notEmptyValidatorFactory = {
    notEmpty: (
        selector: string,
        type: ValidationType,
        opts: NotEmptyValidatorOpts,
    ) => new NotEmptyValidator(selector, type, opts),
};

export class NotEmptyValidator extends AbstractValidator implements Validator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if (!ctx.value) {
            return this.error(ValidatorErrors.NotEmpty.IsEmpty);
        } else if (typeof ctx.value !== "string") {
            ctx.value = String(ctx.value);
        }

        if (isEmptyString(ctx.value)) {
            return this.error(ValidatorErrors.NotEmpty.IsEmpty);
        }
        return this.success();
    }
}
