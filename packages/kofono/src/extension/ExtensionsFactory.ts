import { objectHasKey } from "../common/helpers";
import type { Factory } from "../common/types";
import { builtinExtensionFactories } from "./builtinExtensions";
import type { ExtensionFactoryHandler } from "./types";

export class ExtensionsFactory implements Factory<ExtensionFactoryHandler> {
    #extensions: Record<string, ExtensionFactoryHandler> = {
        ...builtinExtensionFactories,
    };

    get(name: string): ExtensionFactoryHandler {
        return this.#extensions[name];
    }

    has(name: string): boolean {
        return objectHasKey(this.#extensions, name);
    }

    register(
        name: string,
        handler: ExtensionFactoryHandler,
    ): Factory<ExtensionFactoryHandler> {
        this.#extensions[name] = handler;
        return this;
    }
}
