import { version as packageVersion } from "../../package.json";
import { Logs } from "../common/Logs";
import type { Plugins } from "../plugins/types";
import type { Property } from "../property/Property";
import type { SchemaProperty } from "../schema/Schema";
import { DataSelector } from "../selector/DataSelector";
import type { ValidatorResponse } from "../validator/types";
import type { ValidatorsFactory } from "../validator/ValidatorsFactory";
import { DataTree } from "./DataTree";
import { defaultConfig } from "./defaults";
import {
    registerPropertiesEvents,
    warmUpSelectorsEvents,
} from "./events/helpers";
import { Events, type SelectorUpdateCtx } from "./events/types";
import { FormArray } from "./FormArray";
import { FormDataSelector } from "./FormDataSelector";
import { FormEvents } from "./FormEvents";
import { FormPlugins } from "./FormPlugins";
import { FormProperty } from "./FormProperty";
import { FormSelectors } from "./FormSelectors";
import { FormSession } from "./FormSession";
import { generateNewFormState } from "./FormState";
import { FormStats } from "./FormStats";
import {
    type FormConfig,
    FormStatus,
    type Properties,
    type PropertyState,
    type State,
    type UpdateType,
} from "./types";

export class Form {
    static readonly version: string = packageVersion;

    public readonly events: FormEvents;
    public readonly logs: Logs;

    #array: FormArray;
    #config: FormConfig;
    #dataSelector: DataSelector;
    #formDataSelector: FormDataSelector;
    #selectors: FormSelectors;
    #plugins: FormPlugins;
    #props: Properties = {};
    #session: FormSession;
    #state: State;
    #stats: FormStats;
    #status: FormStatus = FormStatus.Init;
    #updateId: number = 0;

    constructor(config: FormConfig = defaultConfig) {
        this.#state = generateNewFormState();
        for (const prop of Object.values(config.properties)) {
            this.addProp(prop);
        }
        config.properties = {};
        this.#state.data = new DataTree().generateTree(this.#props);
        this.#config = config;

        this.#formDataSelector = new FormDataSelector(this);
        this.#dataSelector = new DataSelector();
        this.#selectors = new FormSelectors(this);
        this.#array = new FormArray(this);
        this.#session = new FormSession(this);
        this.#stats = new FormStats(this);
        this.logs = new Logs();
        this.events = new FormEvents(this);
        this.#plugins = new FormPlugins(this);

        this.compileStats();

        if (this.#config.init) {
            this.#config.init(this);
        }
    }

    /**
     * Initialize the form.
     * Can only be initialized once.
     */
    public async init(): Promise<void> {
        if (this.#status === FormStatus.Ready) {
            return;
        }

        await this.events.emit(Events.FormLoading, undefined);

        await registerPropertiesEvents(this); // todo: fix > may crash if an non-existent selector is given
        await warmUpSelectorsEvents(this);
        this.compileStats();

        if (this.#config.state) {
            await this.loadState(this.#config.state);
        }

        if (this.#config.plugins) {
            await this.#plugins.init(this.#config.plugins);
            this.#config.plugins = [];
        }

        this.#status = FormStatus.Ready;
    }

    /**
     * Merge the given state with the current state.
     * @param state
     */
    public async loadState(state: Partial<State>): Promise<void> {
        this.#state = {
            ...this.#state,
            ...state,
        };
        await warmUpSelectorsEvents(this);
        this.compileStats();
        await this.events.emit(Events.FormLoadState, { state });
    }

    public get id(): string {
        return this.#config.id || "";
    }

    public get env(): string {
        return this.#config.env;
    }

    public get validators(): ValidatorsFactory {
        return this.#config.validatorsFactory;
    }

    public get session(): FormSession {
        return this.#session;
    }

    public get state(): State {
        return this.#state;
    }

    public get status(): FormStatus {
        return this.#status;
    }

    public get plugins(): Plugins {
        return this.#plugins.plugins;
    }

    public addProp(prop: Property<SchemaProperty>): Form {
        this.#props[prop.selector] = prop;
        this.state.validations[prop.selector] = [true, ""];
        this.state.qualifications[prop.selector] = [true, ""];
        this.events?.emit(Events.PropertyAdded, {
            selector: prop.selector,
        });
        return this;
    }

    public hasProp(selector: string): boolean {
        return !!this.#props[selector]?.selector || false;
    }

    public async deleteProp(selector: string): Promise<Form> {
        delete this.#props[selector];
        delete this.state.validations[selector];
        delete this.state.qualifications[selector];
        this.#formDataSelector.tryDelete(selector);
        await this.events.emit(Events.PropertyDeleted, {
            selector,
        });
        return this;
    }

    public rawProp<T extends SchemaProperty = SchemaProperty>(
        selector: string,
    ): Property<T> {
        return this.#props[selector] as Property<T>;
    }

    public prop<T extends SchemaProperty = SchemaProperty>(
        selector: string,
    ): FormProperty<T> {
        return new FormProperty<T>(this.#props[selector], this);
    }

    // todo: still necessary?
    public propState(selector: string): PropertyState {
        const validation = this.$v(selector);
        const qualification = this.$q(selector);
        return {
            data: this.$d(selector),
            isValid: validation[0],
            isQualified: qualification[0],
            validationError: validation[1],
            qualificationError: qualification[1],
        };
    }

    public array(): FormArray {
        return this.#array;
    }

    public get vars(): Record<string, unknown> {
        return this.#config.vars;
    }

    public var(keyPath: string): unknown {
        return this.#dataSelector.getOrDefault(
            keyPath,
            undefined,
            this.#config.vars,
        );
    }

    // Get a selector validation value
    public $v(selector: string): ValidatorResponse {
        return this.#state.validations[selector];
    }

    public isValid(selector: string): boolean {
        return this.$v(selector)[0] ?? false;
    }

    // Get a selector qualification value
    public $q(selector: string): ValidatorResponse {
        return this.#state.qualifications[selector];
    }

    public isQualified(selector: string): boolean {
        return this.$q(selector)[0] ?? false;
    }

    // Get a selector data value
    public $d<T>(selector: string): T {
        return this.#formDataSelector.get<T>(selector);
    }

    public get dataSelector(): FormDataSelector {
        return this.#formDataSelector;
    }

    public get selectors(): FormSelectors {
        return this.#selectors;
    }

    public get $(): FormDataSelector {
        return this.#formDataSelector;
    }

    public get props(): Properties {
        return this.#props;
    }

    public propsEntries(): [string, Property<SchemaProperty>][] {
        return Object.entries(this.#props);
    }

    public propsKeys(): string[] {
        return Object.keys(this.#props);
    }

    public updateId(): number {
        return this.#updateId++;
    }

    public childrenProps(
        parentSelector: string,
        includeParent: boolean = false,
    ): Properties {
        const props: Properties = {};
        if (includeParent) {
            props[parentSelector] = this.#props[parentSelector];
        }
        for (const selector in this.#props) {
            if (
                selector.startsWith(parentSelector) &&
                selector !== parentSelector
            ) {
                props[selector] = this.#props[selector];
            }
        }
        return props;
    }

    /**
     * Compile the form stats.
     */
    public compileStats(): Form {
        this.#stats.compile();
        this.state.pass = this.#config.passHandler(this);
        return this;
    }

    /**
     * Update in batch the form data with the new values.
     * @see update
     * @param values
     * @param updateType
     */
    public async updates(
        values: Record<string, unknown>,
        updateType: UpdateType = "normal",
    ): Promise<void> {
        for (const [sel, val] of Object.entries(values)) {
            await this.update(sel, val, updateType);
        }
    }

    /**
     * Update the form data with the new value.
     * This method will trigger the validation and qualification events.
     * @param selector
     * @param newValue
     * @param updateType by default the updateType is "normal" which means that the form session is updated.
     */
    public async update(
        selector: string,
        newValue: unknown,
        updateType: UpdateType = "normal",
    ): Promise<void> {
        const [exists, oldValue] = this.#formDataSelector.tryGet(selector);
        if (!exists) {
            throw new Error(`Selector not found: ${selector}`);
        }

        const updateCtx: SelectorUpdateCtx = {
            id: this.#updateId++,
            selector,
            oldValue,
            newValue,
        };

        if (updateType === "normal") {
            this.#session.update(selector);
        }

        await this.events.emit(Events.SelectorBeforeUpdate, updateCtx);

        this.#formDataSelector.set(selector, newValue);

        const resp = await this.events.emitSelector(
            selector,
            Events.SelectorValidation,
            {
                form: this,
                selector,
                value: newValue,
            },
        );

        if (resp?.hasChanged() || oldValue !== newValue) {
            await this.events.emitSelectorTree(
                selector,
                Events.SelectorQualification,
            );
            await this.events.emitSelectorTree(
                selector,
                Events.SelectorValidation,
            );
        }

        await this.events.emit(Events.SelectorAfterUpdate, updateCtx);
    }
}
