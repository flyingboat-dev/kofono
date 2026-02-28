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

export interface SchemaBetweenValidator {
    between: BetweenValidatorOpts;
}

export type BetweenValidatorOpts = SchemaPropertyBaseValidator & {
    min: number;
    max: number;
};

export function between(
    min: number,
    max: number,
    expect?: string,
): SchemaBetweenValidator {
    return {
        between: {
            min,
            max,
            ...optional("error", expect),
        },
    };
}

export const betweenValidator = {
    name: "between" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: BetweenValidatorOpts,
    ) => new BetweenValidator(selector, type, opts),
};

// BetweenValidator is a validator that checks if a value is between two numbers
// Support value of type string, number and array
export class BetweenValidator extends AbstractValidator implements Validator {
    private readonly min: number;
    private readonly max: number;

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: BetweenValidatorOpts,
    ) {
        super(attachTo, type, opts);
        this.min = opts.min;
        this.max = opts.max;
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        const type = typeof ctx.value;
        if (type === "string" || Array.isArray(ctx.value)) {
            if (ctx.value.length < this.min) {
                return this.error(ValidatorErrors.Between.BelowLengthMin, {
                    min: this.min,
                });
            }
            if (ctx.value.length > this.max) {
                return this.error(ValidatorErrors.Between.AboveLengthMax, {
                    max: this.max,
                });
            }
            return this.success();
        }

        if (typeof ctx.value !== "number") {
            return this.error(ValidatorErrors.Between.InvalidType);
        }
        if (ctx.value < this.min) {
            return this.error(ValidatorErrors.Between.BelowMin, {
                min: this.min,
            });
        }
        if (ctx.value > this.max) {
            return this.error(ValidatorErrors.Between.AboveMax, {
                max: this.max,
            });
        }

        return this.success();
    }
}
