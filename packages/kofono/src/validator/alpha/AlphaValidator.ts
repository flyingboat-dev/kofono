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

export type SchemaAlphaValidator = "alpha" | { alpha: AlphaValidatorOpts };

export type AlphaValidatorOpts = SchemaPropertyBaseValidator & {
    spaces?: boolean;
};

export function alpha(opts: AlphaValidatorOpts, expect?: string) {
    return {
        alpha: {
            ...opts,
            ...optional("error", expect),
        },
    };
}

export const alphaValidator = {
    name: "alpha" as const,
    factory: (
        selector: string,
        type: ValidationType,
        opts: AlphaValidatorOpts,
    ) => new AlphaValidator(selector, type, opts),
};

export class AlphaValidator extends AbstractValidator implements Validator {
    private readonly allowSpaces: boolean;

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: AlphaValidatorOpts,
    ) {
        super(attachTo, type, opts);
        this.allowSpaces = opts.spaces ?? false;
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        if (typeof ctx.value !== "string") {
            return this.error(ValidatorErrors.Alpha.InvalidType);
        }

        const pattern = this.allowSpaces ? /^[A-Za-z\s]+$/ : /^[A-Za-z]+$/;

        if (pattern.test(ctx.value)) {
            return this.success();
        }
        return this.error(ValidatorErrors.Alpha.InvalidChar);
    }
}
