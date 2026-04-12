import { objectHasKey } from "../common/helpers";
import type { Form } from "../form/Form";
import type { Extension } from "./types";

export abstract class BaseExtension<T> implements Extension<T> {
    abstract name: string;
    abstract version: string;
    abstract defaultMeta: T;

    abstract init(form: Form): Promise<void> | void;

    public initMeta(form: Form): void {
        if (!objectHasKey(form.state.meta.extensions, this.name)) {
            form.state.meta.extensions[this.name] = this.defaultMeta;
        }
    }

    meta(form: Form): T {
        return form.state.meta.extensions[this.name];
    }
}
