import type { Plugins } from "../plugins/types";
import type { Form } from "./Form";

export class FormPlugins {
    #plugins: Plugins = [];

    constructor(private form: Form) {}

    public async init(plugins: Plugins): Promise<void> {
        this.#plugins = plugins;
        for (const plugin of this.#plugins) {
            await plugin.init(this.form);
        }
    }

    public get plugins(): Plugins {
        return this.#plugins;
    }
}
