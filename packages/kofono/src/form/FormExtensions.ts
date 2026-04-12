import type { Extension } from "../extension/types";
import type { Form } from "./Form";

export class FormExtensions {
    #extensions: Extension[] = [];

    constructor(private form: Form) {}

    public async init(extensions: Extension[]): Promise<void> {
        this.#extensions = extensions;
        for (const extension of this.#extensions) {
            await extension.init(this.form);
        }
    }

    public get extensions(): Extension[] {
        return this.#extensions;
    }
}
