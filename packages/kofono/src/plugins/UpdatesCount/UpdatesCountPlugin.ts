import { objectHasKey } from "../../common/helpers";
import { Events } from "../../form/events/types";
import type { Form } from "../../form/Form";
import type { Plugin } from "../types";

export type SchemaUpdatesCountPlugin = {
    updatesCount: UpdatesCountOpts;
};

export type UpdatesCountOpts = unknown;

export const updatesCountPluginFactory: Record<
    string,
    (opts: UpdatesCountOpts) => Plugin
> = {
    updatesCount: (opts: UpdatesCountOpts) => new UpdatesCountPlugin(opts),
};

export class UpdatesCountPlugin implements Plugin {
    public readonly name: string = "updatesCount";
    public readonly version: string = "1.0.0";

    constructor(_: UpdatesCountOpts = {}) {}

    async init(form: Form): Promise<void> {
        if (!objectHasKey(form.state.meta, this.name)) {
            form.state.meta["updatesCount"] = 0;
        }
        form.events.on(Events.SelectorAfterUpdate, () => {
            form.state.meta["updatesCount"]++;
        });
    }
}
