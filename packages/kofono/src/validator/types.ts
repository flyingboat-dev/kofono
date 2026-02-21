import type { Form } from "../form/Form";
import type { AbstractValidator } from "./AbstractValidator";
import type { SchemaPropertyBaseValidator } from "./schema";

export type ValidatorFn<TOptions = SchemaPropertyBaseValidator> = (
    v: AbstractValidator,
    opts: TOptions,
    ctx: ValidationContext,
) => Promise<ValidatorResponse>;

// export type ValidatorWithoutOptionsFn = (
//     v: AbstractValidator,
//     ctx: ValidationContext,
// ) => Promise<ValidatorResponse>;

export interface ValidationContext {
    form: Form;
    selector: string;
    value: any;
}

export type ValidatorResponse = [
    isValid: boolean,
    errorCode: string,
    context?: ValidatorResponseContext,
];

export type ValidatorResponseContext = Record<string, any>;

export type ValidationType = "qualification" | "validation";

export interface Validator {
    readonly attachTo: string;
    readonly type: ValidationType;

    validate(
        context: ValidationContext,
    ): ValidatorResponse | Promise<ValidatorResponse>;
    dependencies(): string[];
}

export enum ValidatorError {
    SelectorDisqualified = "SELECTOR_DISQUALIFIED",
    ParentDisqualified = "PARENT_DISQUALIFIED",
}

export type ValidatorFactoryHandler = (
    selector: string,
    type: ValidationType,
    opts?: any,
) => Validator;
