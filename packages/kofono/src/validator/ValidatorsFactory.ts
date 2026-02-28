import { objectHasKey } from "../common/helpers";
import type { Factory } from "../common/types";
import { builtinValidatorFactories } from "./builtinValidators";
import type { ValidatorFactoryHandler } from "./types";

export class ValidatorsFactory implements Factory<ValidatorFactoryHandler> {
    #validators: Record<string, ValidatorFactoryHandler> = {
        ...builtinValidatorFactories,
    };

    public register(
        key: string,
        factoryHandler: ValidatorFactoryHandler,
    ): Factory<ValidatorFactoryHandler> {
        this.#validators[key] = factoryHandler;
        return this;
    }

    public has(validatorName: string): boolean {
        return objectHasKey(this.#validators, validatorName);
    }

    public get(name: string): ValidatorFactoryHandler {
        return this.#validators[name];
    }

    public get list(): Record<string, ValidatorFactoryHandler> {
        return this.#validators;
    }
}
