import { optional } from "../../common/helpers";
import {
    evaluateCondition,
    parseConditionPlaceholders,
    placeholdersListToSelectors,
} from "../_condition/condition";
import type { Condition, PlaceholderList } from "../_condition/types";
import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import type { SchemaPropertyBaseValidator } from "../schema";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";

export interface SchemaConditionValidator {
    condition: ConditionValidatorOpts;
}

export type ConditionValidatorOpts =
    | Condition
    | (SchemaPropertyBaseValidator & {
          condition: Condition;
      });

export const conditionValidatorFactory = {
    condition: (
        selector: string,
        type: ValidationType,
        opts: ConditionValidatorOpts,
    ) => {
        return new ConditionValidator(selector, type, opts);
    },
};

export function condition(
    condition: Condition,
    expect?: string,
): SchemaConditionValidator {
    return {
        condition: {
            condition,
            ...optional("error", expect),
        },
    };
}

export class ConditionValidator extends AbstractValidator implements Validator {
    private readonly placeholders: PlaceholderList;
    private readonly condition: Condition;

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: ConditionValidatorOpts,
    ) {
        super(attachTo, type, opts);

        this.condition = Array.isArray(opts)
            ? (opts as Condition)
            : opts.condition;

        this.placeholders = parseConditionPlaceholders(this.condition, {});
        this.addDependencies(placeholdersListToSelectors(this.placeholders));
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        if (evaluateCondition(this.condition, ctx, this.placeholders)) {
            return this.success();
        }

        return this.error(ValidatorErrors.Condition.IsFailing);
    }
}
