import { objectHasKey } from "../common/helpers";
import type { Factory } from "../common/types";
import { defaultValidatorsFactory } from "./defaultValidatorsFactory";
import type { ValidatorFactoryHandler } from "./types";

export class ValidatorsFactory implements Factory<ValidatorFactoryHandler> {
    #validators: Record<string, ValidatorFactoryHandler> = {
        ...defaultValidatorsFactory,
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
}
