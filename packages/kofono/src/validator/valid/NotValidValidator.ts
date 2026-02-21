import { ValidatorErrors } from "../errors";
import type {
    ValidationContext,
    ValidationType,
    ValidatorResponse
} from "../types";
import {
    type NotValidValidatorOpts,
    NotValidValidatorSchemaToken,
} from "./types";
import { ValidValidator } from "./ValidValidator";

export const notValidValidatorFactory = {
    [NotValidValidatorSchemaToken]: (
        selector: string,
        type: ValidationType,
        opts: NotValidValidatorOpts,
    ) => new NotValidValidator(selector, type, opts),
};

export class NotValidValidator extends ValidValidator {
    validate(ctx: ValidationContext): ValidatorResponse {
        for (const selector of this.selectors) {
            if (!ctx.form.hasProp(selector)) {
                return this.error(ValidatorErrors.NotValid.SelectorNotFound, {
                    selectors: this.selectors,
                });
            }
            // If any selector is valid, return an error
            if (
                ctx.form.prop(selector).isValid() &&
                ctx.form.prop(selector).isQualified()
            ) {
                return this.error(ValidatorErrors.NotValid.SelectorValid, {
                    selectors: this.selectors,
                });
            }
        }
        // All selectors are not valid, return success
        return this.success();
    }
}
