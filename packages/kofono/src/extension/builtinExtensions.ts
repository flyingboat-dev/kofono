import type { ExtensionFactoryHandler } from "./types";
import * as UpdateCounter from "./UpdateCounter/UpdateCounterExtension";

export const builtinExtensions = [
    UpdateCounter.updateCounterExtension,
] as const;

export const builtinExtensionFactories: Record<
    string,
    ExtensionFactoryHandler<any>
> = Object.fromEntries(builtinExtensions.map(v => [v.name, v.factory]));
