import type {
    ExtensionBaseOptions,
    ExtensionFactoryHandler,
} from "../extension/types";
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
    constructor(public readonly form: Form) {}

    public addValidator<TValidatorOpts = GenericValidatorOptions>(
        key: string,
        fn: ValidatorFn<TValidatorOpts>,
        dependencies: DependenciesFn<TValidatorOpts> = () => [],
    ): FormInitContext {
        this.form.validatorsFactory.register(
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

    public addExtension<
        TOptions extends ExtensionBaseOptions = ExtensionBaseOptions,
    >(
        name: string,
        handler: ExtensionFactoryHandler<TOptions>,
    ): FormInitContext {
        this.form.extensionsFactory.register<TOptions>(name, handler);
        return this;
    }
}
