import { Events } from "../../form/events/types";
import { BaseExtension } from "../BaseExtension";
import type { ExtensionContext, SchemaExtensionBaseOptions } from "../types";

// this is a basic extension to count the number of updates performed on the form
// it serves as an example of how to create a custom extension

// represent the schema structure definition
export type SchemaUpdateCounterExtension = {
    updateCounter: UpdateCounterOpts;
};

// represent the options passed to the extension at form creation.
export type UpdateCounterOpts = SchemaExtensionBaseOptions;

// represent the extension meta-state shape/type
export type UpdateCounterMeta = number;

// represent the extension declaration and factory
export const updateCounterExtension = {
    name: "updateCounter" as const,
    factory: (ctx: ExtensionContext, opts: UpdateCounterOpts) =>
        new UpdateCounterExtension(ctx, opts),
};

// helper to build the schema definition
export function updateCounter(id?: string): SchemaUpdateCounterExtension {
    return {
        updateCounter: {
            id,
        },
    };
}

// the extension implementation
export class UpdateCounterExtension extends BaseExtension<
    UpdateCounterMeta,
    UpdateCounterOpts
> {
    public readonly defaultMetaData: UpdateCounterMeta = 0;

    constructor(ctx: ExtensionContext, opts: UpdateCounterOpts = {}) {
        super(ctx, opts);
    }

    async init(): Promise<void> {
        this.form.events.on(Events.SelectorAfterUpdate, () => {
            this.metaData = this.metaData + 1;
        });
    }
}
