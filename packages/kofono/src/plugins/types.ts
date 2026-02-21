import type { Form } from "../form/Form";
import type { SchemaUpdatesCountPlugin } from "./UpdatesCount/UpdatesCountPlugin";

export type Plugins = Plugin[];

export interface Plugin {
    name: string;
    version: string;

    init(form: Form): Promise<void> | void;
}

export type SchemaPlugin = Record<string, any> & SchemaUpdatesCountPlugin;

export type SchemaPlugins = SchemaPlugin[];
