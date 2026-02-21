import type { Form } from "./Form";

export class FormSession {
    public constructor(private readonly form: Form) {
        if (this.form.state.meta.hasBeenUpdated === undefined) {
            this.form.state.meta.hasBeenUpdated = [];
        }
    }

    public update(selector: string): void {
        if (!this.hasBeenUpdated(selector)) {
            this.form.state.meta.hasBeenUpdated.push(selector);
        }
    }

    public hasBeenUpdated(selector: string): boolean {
        return this.form.state.meta.hasBeenUpdated.includes(selector);
    }
}
