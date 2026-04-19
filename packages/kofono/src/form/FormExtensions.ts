import type { Extension } from "../extension/types";
import type { Form } from "./Form";

export type ExtensionDefinition = [name: string, options: any];

export class FormExtensions {
    #extensions: Extension[] = [];

    constructor(private form: Form) {}

    public build(extensions: ExtensionDefinition[]) {
        const extensionInstances: Extension[] = [];

        for (const [name, opts] of extensions) {
            if (this.form.extensionsFactory.has(name)) {
                const factory = this.form.extensionsFactory.get(name);
                extensionInstances.push(factory(opts));
            }
        }

        this.#extensions.push(...extensionInstances);
    }

    public add(extension: Extension | Extension[]) {
        if (!Array.isArray(extension)) {
            extension = [extension];
        }
        this.#extensions.push(...extension);
    }

    public async init(): Promise<void> {
        for (const extension of this.#extensions) {
            await extension.init(this.form);
        }
    }

    public get extensions(): Extension[] {
        return this.#extensions;
    }
}
