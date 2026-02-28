import { optional } from "../../common/helpers";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    ValidatorResponse,
} from "../types";
import { IsValidValidator } from "./IsValidValidator";

export type IsNotValidValidatorOpts =
    | string
    | string[]
    | (SchemaPropertyBaseValidator & {
          selectors: string | string[];
      });

export interface SchemaIsNotValidValidator {
    isNotValid: IsNotValidValidatorOpts;
}

export function isNotValid(
    selectors: string | string[],
    expect?: string,
): SchemaIsNotValidValidator {
    return {
        isNotValid: {
            selectors,
            ...optional("error", expect),
        },
    };
}

export const isNotValidValidator = {
    name: "isNotValid" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: IsNotValidValidatorOpts,
    ) => new IsNotValidValidator(selector, type, opts),
};

export class IsNotValidValidator extends IsValidValidator {
    validate(ctx: ValidationContext): ValidatorResponse {
        for (const selector of this.selectors) {
            if (!ctx.form.hasProp(selector)) {
                return this.error(ValidatorErrors.IsNotValid.SelectorNotFound, {
                    selectors: this.selectors,
                });
            }
            // If any selector is valid, return an error
            if (
                ctx.form.prop(selector).isValid() &&
                ctx.form.prop(selector).isQualified()
            ) {
                return this.error(ValidatorErrors.IsNotValid.SelectorValid, {
                    selectors: this.selectors,
                });
            }
        }
        // All selectors are not valid, return success
        return this.success();
    }
}
