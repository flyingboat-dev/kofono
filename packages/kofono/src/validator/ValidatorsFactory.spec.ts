import { beforeAll, describe, expect, it } from "vitest";
import { builtinValidatorFactories } from "./builtinValidators";
import { ValidatorsFactory } from "./ValidatorsFactory";

describe("DefaultValidatorsFactory test", () => {
    let factory: ValidatorsFactory;
    beforeAll(() => {
        factory = new ValidatorsFactory();
    });

    it("should register default validator", () => {
        const defaultValidatorsName = Object.keys(builtinValidatorFactories);
        for (const validatorName of defaultValidatorsName) {
            expect(factory.has(validatorName)).toBeTruthy();
        }
    });
});
