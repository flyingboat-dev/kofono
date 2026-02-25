import { Events } from "../../form/events/types";
import type { Form } from "../../form/Form";
import { BasePlugin } from "../BasePlugin";

// this is a basic plugin to count the number of updates performed on the form
// it serves as an example of how to create a custom plugin

// represent the schema structure definition
export type SchemaUpdateCounterPlugin = {
    updateCounter: UpdateCounterOpts;
};

// represent the options passed to the plugin at form creation
export type UpdateCounterOpts = unknown;

// represent the plugin meta-state shape/type
export type UpdateCounterMeta = number;

// factory to build the plugin instance from the schema definition
export const updateCounterPluginFactory = {
    updateCounter: (opts: UpdateCounterOpts) => new UpdateCounterPlugin(opts),
};

// function to build the schema definition
export function updateCounter(): SchemaUpdateCounterPlugin {
    return {
        updateCounter: {},
    };
}

// the plugin implementation
export class UpdateCounterPlugin extends BasePlugin<UpdateCounterMeta> {
    public readonly name: string = "updateCounter";
    public readonly version: string = "1.0.0";
    public readonly defaultMeta = 0;

    constructor(_: UpdateCounterOpts = {}) {
        super();
    }

    async init(form: Form): Promise<void> {
        this.initMeta(form);
        let _metaValue = this.meta(form);

        form.events.on(Events.SelectorAfterUpdate, () => {
            _metaValue++;
        });
    }
}
