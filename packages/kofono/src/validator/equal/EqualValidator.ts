import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";
import { type EqualValidatorOpts, EqualValidatorSchemaToken } from "./types";

export const equalValidatorFactory = {
    [EqualValidatorSchemaToken]: (
        selector: string,
        type: ValidationType,
        opts: EqualValidatorOpts,
    ) => new EqualValidator(selector, type, opts),
};

export class EqualValidator extends AbstractValidator implements Validator {
    protected readonly expectedValue: string | number | boolean | null;
    protected readonly caseSensitive: boolean = true;

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: EqualValidatorOpts,
    ) {
        super(attachTo, type, opts);
        this.expectedValue = opts.value;
        if (opts.caseSensitive !== undefined) {
            this.caseSensitive = opts.caseSensitive;
            if (!this.caseSensitive) {
                this.expectedValue = String(this.expectedValue).toLowerCase();
            }
        }
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        if (typeof ctx.value === "string" && !this.caseSensitive) {
            ctx.value = ctx.value.toLowerCase();
        }
        if (ctx.value === this.expectedValue) {
            return this.success();
        }
        return this.error(ValidatorErrors.Equal.IsNotEqual);
    }
}
