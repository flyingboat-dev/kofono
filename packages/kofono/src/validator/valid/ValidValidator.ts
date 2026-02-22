import { objectHasKey } from "../../common/helpers";
import {
    getParentSelector,
    resolvePartialSelectors,
} from "../../selector/helpers";
import { AbstractValidator } from "../AbstractValidator";
import { ValidatorErrors } from "../errors";
import { OptionsError } from "../OptionsError";
import type {
    ValidationContext,
    ValidationType,
    Validator,
    ValidatorResponse,
} from "../types";
import { type ValidValidatorOpts, ValidValidatorSchemaToken } from "./types";

export const validValidatorFactory = {
    [ValidValidatorSchemaToken]: (
        selector: string,
        type: ValidationType,
        opts: ValidValidatorOpts,
    ) => new ValidValidator(selector, type, opts),
};

export class ValidValidator extends AbstractValidator implements Validator {
    protected readonly selectors: string[] = [];

    constructor(
        attachTo: string,
        type: ValidationType,
        opts: ValidValidatorOpts,
    ) {
        super(attachTo, type, opts);

        if (typeof opts === "string") {
            this.selectors = [opts];
        } else if (Array.isArray(opts)) {
            this.selectors = opts;
        } else if (
            typeof opts === "object" &&
            objectHasKey(opts, "selectors")
        ) {
            this.selectors = !Array.isArray(opts.selectors)
                ? [opts.selectors]
                : opts.selectors;
        } else {
            throw new OptionsError(this);
        }

        const parentSelector = getParentSelector(this.attachTo);
        this.selectors = resolvePartialSelectors(
            parentSelector,
            this.selectors,
        );
        this.selDeps = this.selectors;
    }

    validate(ctx: ValidationContext): ValidatorResponse {
        for (const selector of this.selectors) {
            if (!ctx.form.hasProp(selector)) {
                return this.error(ValidatorErrors.Valid.SelectorNotFound, {
                    selectors: this.selectors,
                });
            }
            if (
                !ctx.form.prop(selector).isValid() ||
                !ctx.form.prop(selector).isQualified()
            ) {
                return this.error(ValidatorErrors.Valid.SelectorNotValid, {
                    selectors: this.selectors,
                });
            }
        }
        return this.success();
    }
}
