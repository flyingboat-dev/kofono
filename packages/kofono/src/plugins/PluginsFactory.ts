import { objectHasKey } from "../common/helpers";
import type { Factory } from "../common/types";
import { defaultPluginsFactory } from "./defaultPluginsFactory";
import type { Plugin } from "./types";

type PluginFactoryHandler = (opts: any) => Plugin;

export class PluginsFactory implements Factory<PluginFactoryHandler> {
    #plugins: Record<string, PluginFactoryHandler> = {
        ...defaultPluginsFactory,
    };

    get(name: string): PluginFactoryHandler {
        return this.#plugins[name];
    }

    has(name: string): boolean {
        return objectHasKey(this.#plugins, name);
    }

    register(
        name: string,
        handler: PluginFactoryHandler,
    ): Factory<PluginFactoryHandler> {
        this.#plugins[name] = handler;
        return this;
    }
}
