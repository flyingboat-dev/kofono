import type { Form } from "../form/Form";
import type {
    SchemaUpdateCounterPlugin
} from "./UpdateCounter/UpdateCounterPlugin";

export interface Plugin<T = any> {
    name: string;
    version: string;
    defaultMeta: T;

    init(form: Form): Promise<void> | void;
}

export type SchemaPlugin = Record<string, any> & SchemaUpdateCounterPlugin;

export type SchemaPlugins = SchemaPlugin[];
