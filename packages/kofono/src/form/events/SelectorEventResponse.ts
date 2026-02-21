import type { ValidatorResponse } from "../../validator/types";

export class SelectorEventResponse {
    constructor(
        public readonly before: ValidatorResponse,
        public readonly after: ValidatorResponse,
    ) {}

    public hasChanged(): boolean {
        return this.before[0] !== this.after[0];
    }
}
