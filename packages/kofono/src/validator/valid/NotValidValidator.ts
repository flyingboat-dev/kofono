import { optional } from "../../common/helpers";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    ValidatorResponse,
} from "../types";
import { ValidValidator } from "./ValidValidator";

export type NotValidValidatorOpts =
    | string
    | string[]
    | (SchemaPropertyBaseValidator & {
          selectors: string | string[];
      });

export interface SchemaIsNotValidValidator {
    notValid: NotValidValidatorOpts;
}

export const notValidValidatorFactory = {
    notValid: (
        selector: string,
        type: ValidationType,
        opts: NotValidValidatorOpts,
    ) => new NotValidValidator(selector, type, opts),
};

export function notValid(
    selectors: string | string[],
    expect?: string,
): SchemaIsNotValidValidator {
    return {
        notValid: {
            selectors,
            ...optional("error", expect),
        },
    };
}

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
