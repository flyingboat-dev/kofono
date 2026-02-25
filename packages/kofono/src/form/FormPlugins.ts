import type { Plugin } from "../plugins/types";
import type { Form } from "./Form";

export class FormPlugins {
    #plugins: Plugin[] = [];

    constructor(private form: Form) {}

    public async init(plugins: Plugin[]): Promise<void> {
        this.#plugins = plugins;
        for (const plugin of this.#plugins) {
            await plugin.init(this.form);
        }
    }

    public get plugins(): Plugin[] {
        return this.#plugins;
    }
}
