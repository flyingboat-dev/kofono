import { objectHasKey } from "../common/helpers";
import type { Form } from "../form/Form";
import type { Plugin } from "./types";

export abstract class BasePlugin<T> implements Plugin<T> {
    abstract name: string;
    abstract version: string;
    abstract defaultMeta: T;

    abstract init(form: Form): Promise<void> | void;

    public initMeta(form: Form): void {
        if (!objectHasKey(form.state.meta.plugins, this.name)) {
            form.state.meta.plugins[this.name] = this.defaultMeta;
        }
    }

    meta(form: Form): T {
        return form.state.meta.plugins[this.name];
    }
}
