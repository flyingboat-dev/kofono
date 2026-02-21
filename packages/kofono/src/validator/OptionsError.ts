import type { Validator } from "./types";

export class OptionsError extends Error {
    constructor(validator: Validator) {
        super(`"Invalid ${typeof validator} options"`);
    }
}
