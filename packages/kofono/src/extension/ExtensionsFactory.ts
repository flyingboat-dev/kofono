import { objectHasKey } from "../common/helpers";
import type { Factory } from "../common/types";
import { defaultExtensionsFactory } from "./defaultExtensionsFactory";
import type { Extension } from "./types";

type ExtensionFactoryHandler = (opts: any) => Extension;

export class ExtensionsFactory implements Factory<ExtensionFactoryHandler> {
    #extensions: Record<string, ExtensionFactoryHandler> = {
        ...defaultExtensionsFactory,
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
