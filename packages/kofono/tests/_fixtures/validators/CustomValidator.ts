import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../../../src";

export class CustomValidator implements Validator {
    constructor(
        public readonly attachTo: string,
        public readonly type: ValidationType,
    ) {}

    dependencies(): string[] {
        return [];
    }

    validate({ value }: ValidationContext): ValidatorResponse {
        return value === "bob" ? [true, ""] : [false, "NOT_BOB"];
    }
}
