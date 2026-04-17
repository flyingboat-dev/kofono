import type { Form } from "../form/Form";
import type { SchemaUpdateCounterExtension } from "./UpdateCounter/UpdateCounterExtension";

export interface Extension<T = any> {
    name: string;
    version: string;
    defaultMeta: T;

    init(form: Form): Promise<void> | void;
}

export type SchemaExtension = Record<string, any> &
    SchemaUpdateCounterExtension;
