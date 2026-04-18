import { GenericValidator } from "../validator/GenericValidator";
import type {
    GenericValidatorOptions,
    ValidationType,
    ValidatorFn,
} from "../validator/types";
import type { Form } from "./Form";

export class FormConfigInitializer {
    constructor(private readonly _form: Form) {}

    public get form(): Form {
        return this._form;
    }

    public addValidator<TValidatorOpts = GenericValidatorOptions>(
        key: string,
        fn: ValidatorFn<TValidatorOpts>,
    ): FormConfigInitializer {
        this._form.validators.register(
            key,
            (selector: string, type: ValidationType, opts: TValidatorOpts) =>
                new GenericValidator<TValidatorOpts>(selector, type, opts, fn),
        );
        return this;
    }
}
