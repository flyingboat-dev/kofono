import { isObjectLiteral } from "../common/helpers";
import type { SchemaPropertyBaseValidator } from "./schema";
import type {
    ValidationType,
    ValidatorResponse,
    ValidatorResponseContext,
} from "./types";

type Options = SchemaPropertyBaseValidator & Record<string, unknown>;

export abstract class AbstractValidator {
    protected selDeps: string[] = [];

    public constructor(
        public readonly attachTo: string,
        public readonly type: ValidationType,
        public readonly opts?: Options | unknown,
    ) {}

    public dependencies(): string[] {
        return this.selDeps;
    }

    // Adds selectors to the list of dependencies for this validator.
    public addDependencies(selectors: string[] | string): void {
        if (typeof selectors === "string") {
            selectors = [selectors];
        }
        this.selDeps.push(...selectors);
    }

    public success(code: string = ""): ValidatorResponse {
        return [true, code];
    }

    public error(
        code: string,
        context?: ValidatorResponseContext,
    ): ValidatorResponse {
        if (context) {
            return [false, this.errorCode(code), context];
        }
        return [false, this.errorCode(code)];
    }

    // override the error code with custom error code if provided in opts
    private errorCode(code: string): string {
        if (isObjectLiteral(this.opts) && this.opts.error) {
            return this.opts.error;
        }
        return code;
    }
}
