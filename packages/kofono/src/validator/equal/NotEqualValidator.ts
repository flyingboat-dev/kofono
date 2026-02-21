import { ValidatorErrors } from "../errors";
import type {
    ValidationContext,
    ValidationType,
    ValidatorResponse,
} from "../types";
import { EqualValidator } from "./EqualValidator";
import {
    type NotEqualValidatorOpts,
    NotEqualValidatorSchemaToken,
} from "./types";

export const notEqualValidatorFactory = {
    [NotEqualValidatorSchemaToken]: (
        selector: string,
        type: ValidationType,
        opts: NotEqualValidatorOpts,
    ) => new NotEqualValidator(selector, type, opts),
};

export class NotEqualValidator extends EqualValidator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if (typeof ctx.value === "string" && !this.caseSensitive) {
            ctx.value = ctx.value.toLowerCase();
        }

        if (ctx.value !== this.expectedValue) {
            return this.success();
        }
        return this.error(ValidatorErrors.NotEqual.IsEqual);
    }
}
