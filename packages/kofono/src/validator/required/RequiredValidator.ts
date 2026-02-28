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

export type SchemaRequiredValidator =
    | "required"
    | { required: RequiredValidatorOpts };

export type RequiredValidatorOpts = SchemaPropertyBaseValidator;

export function required(expect?: string): SchemaRequiredValidator {
    return {
        required: {
            ...optional("error", expect),
        },
    };
}

export const requiredValidator = {
    name: "required" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: RequiredValidatorOpts,
    ) => new RequiredValidator(selector, type, opts),
};

export class RequiredValidator extends AbstractValidator implements Validator {
    validate(ctx: ValidationContext): ValidatorResponse {
        if ([undefined, null].includes(ctx.value)) {
            return this._error;
        }

        const valueType = typeof ctx.value;

        if (valueType === "string" && isEmptyString(ctx.value)) {
            return this._error;
        } else if (valueType === "boolean" && ctx.value === false) {
            return this._error;
        } else if (Array.isArray(ctx.value) && ctx.value.length < 1) {
            return this._error;
        }

        return this.success();
    }

    private get _error() {
        return this.error(ValidatorErrors.Required.IsRequired);
    }
}
