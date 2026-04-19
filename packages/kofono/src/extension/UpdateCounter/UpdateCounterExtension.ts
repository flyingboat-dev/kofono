import { Events } from "../../form/events/types";
import type { Form } from "../../form/Form";
import { BaseExtension } from "../BaseExtension";

// this is a basic extension to count the number of updates performed on the form
// it serves as an example of how to create a custom extension

// represent the schema structure definition
export type SchemaUpdateCounterExtension = {
    updateCounter: UpdateCounterOpts;
};

// represent the options passed to the extension at form creation.
export type UpdateCounterOpts = unknown;

// represent the extension meta-state shape/type
export type UpdateCounterMeta = number;

// represent the extension declaration and factory
export const updateCounterExtension = {
    name: "updateCounter" as const,
    factory: (opts: UpdateCounterOpts) => new UpdateCounterExtension(opts),
};

// function to build the schema definition
export function updateCounter(): SchemaUpdateCounterExtension {
    return {
        updateCounter: {},
    };
}

// the extension implementation
export class UpdateCounterExtension extends BaseExtension<UpdateCounterMeta> {
    public readonly metaName: string = updateCounterExtension.name;
    public readonly metaData = 0;

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
