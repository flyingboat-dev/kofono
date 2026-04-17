import type { Extension } from "./types";
import { updateCounterExtensionFactory } from "./UpdateCounter/UpdateCounterExtension";

export const defaultExtensionsFactory: Record<
    string,
    (opts: any) => Extension
> = {
    ...updateCounterExtensionFactory,
};
