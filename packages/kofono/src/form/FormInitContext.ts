import { GenericValidator } from "../validator/GenericValidator";
import type {
    GenericValidatorOptions,
    ValidationType,
    ValidatorFn,
} from "../validator/types";
import type { Form } from "./Form";

type DependenciesFn<TValidatorOpts = GenericValidatorOptions> = (
    validator: GenericValidator<TValidatorOpts>,
) => string[];

export class FormInitContext {
    constructor(private readonly _form: Form) {}

    public get form(): Form {
        return this._form;
    }

    public addValidator<TValidatorOpts = GenericValidatorOptions>(
        key: string,
        fn: ValidatorFn<TValidatorOpts>,
        dependencies: DependenciesFn<TValidatorOpts> = () => [],
    ): FormInitContext {
        this._form.validatorsFactory.register(
            key,
            (selector: string, type: ValidationType, opts: TValidatorOpts) => {
                const val = new GenericValidator<TValidatorOpts>(
                    selector,
                    type,
                    opts,
                    fn,
                );
                if (dependencies) {
                    val.addDependencies(dependencies(val));
                }
                return val;
            },
        );
        return this;
    }
}
