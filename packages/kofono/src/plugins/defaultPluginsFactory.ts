import type { Plugin } from "./types";
import { updatesCountPluginFactory } from "./UpdatesCount/UpdatesCountPlugin";

export const defaultPluginsFactory: Record<string, (opts: any) => Plugin> = {
    ...updatesCountPluginFactory,
};
