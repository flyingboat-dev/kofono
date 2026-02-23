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

export interface SchemaMaxValidator {
    max: MaxValidatorOpts;
}

export type MaxValidatorOpts =
    | number
    | (SchemaPropertyBaseValidator & {
          value: number;
      });

export const maxValidatorFactory = {
    max: (selector: string, type: ValidationType, opts: MaxValidatorOpts) =>
        new MaxValidator(selector, type, opts),
};

export function max(max: number, expect?: string): SchemaMaxValidator {
    return {
        max: {
            value: max,
            ...optional("error", expect),
        },
    };
}

export class MaxValidator extends AbstractValidator implements Validator {
    private readonly max: number;

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: MaxValidatorOpts,
    ) {
        super(attachTo, type, opts);

        this.max = typeof opts === "number" ? opts : opts.value;
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        const type = typeof ctx.value;
        if (type === "number") {
            if (ctx.value > this.max) {
                return this.error(ValidatorErrors.Max.AboveMax, {
                    max: this.max,
                });
            }
            return this.success();
        } else if (type === "string" || Array.isArray(ctx.value)) {
            if (ctx.value.length > this.max) {
                return this.error(ValidatorErrors.Max.AboveMax, {
                    max: this.max,
                });
            }
            return this.success();
        }
        return this.error(ValidatorErrors.Max.InvalidType);
    }
}
