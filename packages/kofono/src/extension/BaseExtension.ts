import { objectHasKey } from "../common/helpers";
import type { Form } from "../form/Form";
import type { Extension } from "./types";

export abstract class BaseExtension<T> implements Extension<T> {
    abstract metaName: string;
    abstract metaData: T;

    abstract init(form: Form): Promise<void> | void;

    public initMeta(form: Form): void {
        if (!objectHasKey(form.state.meta.extensions, this.metaName)) {
            form.state.meta.extensions[this.metaName] = this.metaData;
        }
    }

    meta(form: Form): T {
        return form.state.meta.extensions[this.metaName];
    }
}
