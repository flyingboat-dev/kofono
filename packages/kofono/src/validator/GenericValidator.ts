import { AbstractValidator } from "./AbstractValidator";
import type { SchemaPropertyBaseValidator } from "./schema";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorFn,
    ValidatorResponse,
} from "./types";

/**
 * GenericValidator is a wrapper for any validator closure function of type ValidatorFn
 */
export class GenericValidator<TOptions = SchemaPropertyBaseValidator>
    extends AbstractValidator
    implements Validator
{
    constructor(
        attachTo: string,
        type: ValidationType,
        opts: TOptions,
        protected validatorCallback: ValidatorFn<TOptions>,
    ) {
        super(attachTo, type, opts);
    }

    async validate(ctx: ValidationContext): Promise<ValidatorResponse> {
        return await this.validatorCallback(this, this.opts as TOptions, ctx);
    }
}
