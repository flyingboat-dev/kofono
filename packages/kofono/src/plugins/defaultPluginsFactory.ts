import type { Plugin } from "./types";
import { updateCounterPluginFactory } from "./UpdateCounter/UpdateCounterPlugin";

export const defaultPluginsFactory: Record<string, (opts: any) => Plugin> = {
    ...updateCounterPluginFactory,
};
