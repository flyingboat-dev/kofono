import type { PropertyValidator } from "../../property/types";
import type {
    ValidationContext,
    ValidatorResponse,
} from "../../validator/types";
import type { State } from "../types";

/**
 * All `Events` enum represents different types of events that can occur in the system.
 * Each event type corresponds to a specific action or state change.
 */
export enum Events {
    ArrayPropertyExpanded = "ArrayPropertyExpanded",
    ArrayPropertySliced = "ArrayPropertySliced",
    FormLoadState = "FormLoadState",
    FormLoading = "FormLoading",
    FormReady = "FormReady",
    PropertyAdded = "PropertyAdded",
    PropertyDeleted = "PropertyDeleted",
    SelectorAfterUpdate = "SelectorAfterUpdate",
    SelectorBeforeUpdate = "SelectorBeforeUpdate",
    SelectorQualification = "SelectorQualification",
    SelectorValidation = "SelectorValidation",
}

/**
 * The `EventsCallbacks` interface maps each event type in the `Events` enum to a function callback.
 * These functions represent the type of function that should be used to handle each event.
 */
export interface EventsCallbacks {
    [Events.ArrayPropertyExpanded]: (
        ctx: ArrayPropertyExpandCtx,
    ) => void | Promise<void>;
    [Events.ArrayPropertySliced]: (
        ctx: ArrayPropertySliceCtx,
    ) => void | Promise<void>;
    [Events.FormLoadState]: (ctx: StateChangeCtx) => void | Promise<void>;
    [Events.FormLoading]: () => void | Promise<void>;
    [Events.FormReady]: () => void | Promise<void>;
    [Events.PropertyAdded]: (ctx: PropertyChangeCtx) => void | Promise<void>;
    [Events.PropertyDeleted]: (ctx: PropertyChangeCtx) => void | Promise<void>;
    [Events.SelectorAfterUpdate]: (
        ctx: SelectorUpdateCtx,
    ) => void | Promise<void>;
    [Events.SelectorBeforeUpdate]: (
        ctx: SelectorUpdateCtx,
    ) => void | Promise<void>;
    [Events.SelectorQualification]: (
        ctx: ValidationContext,
    ) => ValidatorResponse | Promise<ValidatorResponse>;
    [Events.SelectorValidation]: (
        ctx: ValidationContext,
    ) => ValidatorResponse | Promise<ValidatorResponse>;
}

/**
 * The `SelectorEventCtx` type maps each event type in the `Events` enum to a specific context.
 */
export type SelectorEventCtx = {
    [Events.SelectorValidation]: ValidationContext;
    [Events.SelectorQualification]: ValidationContext;
};

/**
 * The `SelectorEventCallbacks` type is a narrowed version of `EventsCallbacks`.
 * It only includes the callbacks for the selector events.
 */
export type SelectorEventCallbacks = {
    [Events.SelectorValidation]: EventsCallbacks[Events.SelectorValidation];
    [Events.SelectorQualification]: EventsCallbacks[Events.SelectorQualification];
};

/**
 * The `SelectorEvents` type maps each event type in the `Events` enum to an array of its specific event handlers.
 * This allows multiple handlers for each selector event.
 */
export type SelectorEvents = {
    [Events.SelectorValidation]: EventsCallbacks[Events.SelectorValidation][];
    [Events.SelectorQualification]: EventsCallbacks[Events.SelectorQualification][];
};

/**
 * `SelectorsEvents` is a type that defines a map. In this map, each key is a string that represents a selector,
 * and each value is an instance of `SelectorEvents`. This structure allows for the association of multiple event handlers
 * with each selector event.
 */
export type SelectorsEvents = {
    [key: string]: SelectorEvents;
};

/**
 * `SelectorsValidators` is a type that represents a map of selector validators.
 * The key represents a property selector.
 */
export type SelectorsEventsValidators = Record<
    string,
    {
        [Events.SelectorValidation]: PropertyValidator[];
        [Events.SelectorQualification]: PropertyValidator[];
    }
>;

/**
 * Then `GlobalEventCtx` is a type that maps each global event type to its specific context.
 */
export type GlobalEventCtx = {
    [Events.ArrayPropertyExpanded]: ArrayPropertyExpandCtx;
    [Events.ArrayPropertySliced]: ArrayPropertySliceCtx;
    [Events.SelectorBeforeUpdate]: SelectorUpdateCtx;
    [Events.SelectorAfterUpdate]: SelectorUpdateCtx;
    [Events.PropertyAdded]: PropertyChangeCtx;
    [Events.PropertyDeleted]: PropertyChangeCtx;
    [Events.FormLoadState]: StateChangeCtx;
    [Events.FormLoading]: undefined;
    [Events.FormReady]: undefined;
};

/**
 * The `GlobalEventCallbacks` type is a narrowed version of `EventsCallbacks`.
 * It only includes the callbacks for the global events.
 */
export type GlobalEventCallbacks = {
    [Events.ArrayPropertyExpanded]: EventsCallbacks[Events.ArrayPropertyExpanded];
    [Events.ArrayPropertySliced]: EventsCallbacks[Events.ArrayPropertySliced];
    [Events.SelectorBeforeUpdate]: EventsCallbacks[Events.SelectorBeforeUpdate];
    [Events.SelectorAfterUpdate]: EventsCallbacks[Events.SelectorAfterUpdate];
    [Events.PropertyAdded]: EventsCallbacks[Events.PropertyAdded];
    [Events.PropertyDeleted]: EventsCallbacks[Events.PropertyDeleted];
    [Events.FormLoadState]: EventsCallbacks[Events.FormLoadState];
    [Events.FormLoading]: EventsCallbacks[Events.FormLoading];
    [Events.FormReady]: EventsCallbacks[Events.FormReady];
};

/**
 * The `GlobalEvents` type maps each global event type to an array of its specific event handlers.
 * This allows multiple handlers for each global event.
 */
export type GlobalEvents = {
    [Events.ArrayPropertyExpanded]: EventsCallbacks[Events.ArrayPropertyExpanded][];
    [Events.ArrayPropertySliced]: EventsCallbacks[Events.ArrayPropertySliced][];
    [Events.SelectorBeforeUpdate]: EventsCallbacks[Events.SelectorBeforeUpdate][];
    [Events.SelectorAfterUpdate]: EventsCallbacks[Events.SelectorAfterUpdate][];
    [Events.PropertyAdded]: EventsCallbacks[Events.PropertyAdded][];
    [Events.PropertyDeleted]: EventsCallbacks[Events.PropertyDeleted][];
    [Events.FormLoadState]: EventsCallbacks[Events.FormLoadState][];
    [Events.FormLoading]: EventsCallbacks[Events.FormLoading][];
    [Events.FormReady]: EventsCallbacks[Events.FormReady][];
};

/**
 * `SelectorUpdateCtx` is a type that represents the context of a selector update event.
 */
export type SelectorUpdateCtx = {
    id: number;
    selector: string;
    oldValue: any;
    newValue: any;
    //todo should have the updateType too?
};

/**
 * `PropertyChangeCtx` is a type that represents the context of a property change event.
 */
export type PropertyChangeCtx = {
    selector: string;
};

export type ArrayPropertyExpandCtx = {
    selector: string;
    qty: number;
};

export type ArrayPropertySliceCtx = {
    selector: string;
    index: number;
};

export type StateChangeCtx = {
    state: Partial<State>;
};
