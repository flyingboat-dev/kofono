import type { PluginsFactory } from "../plugins/PluginsFactory";
import type { Plugin } from "../plugins/types";
import type { Property } from "../property/Property";
import type { SchemaProperty } from "../schema/Schema";
import type { ValidatorResponse } from "../validator/types";
import type { ValidatorsFactory } from "../validator/ValidatorsFactory";
import type { Form } from "./Form";

export enum FormStatus {
    Init = "init",
    Ready = "ready",
    Error = "error",
}

export enum FormEnv {
    dev = "dev",
    prod = "prod",
    test = "test",
}

export type FormConfig = {
    id?: string;
    env: FormEnv;
    passHandler: PassHandler;
    validatorsFactory: ValidatorsFactory;
    pluginsFactory: PluginsFactory;
    plugins?: Plugin[];
    properties: Properties;
    vars: Record<string, unknown>;
    state?: Partial<State>;
    init?: (form: Form) => void;
    [key: string]: unknown;
};

export type Properties = Record<string, Property<SchemaProperty>>;

export type Data = Record<string, any>;

export interface Meta {
    hasBeenUpdated: string[];
    plugins: Record<string, any>;
}

export type Stats = {
    qualified: number;
    valid: number;
    invalid: number;
    progression: number | string;
    node: number;
    leaf: number;
};

export type Env = "dev" | "prod" | "test" | "debug" | "trace" | "silent";

export type State = {
    sessionId: string; // unique id of the form
    data: Data; // data of the form
    stats: Stats; // stats of the form
    meta: Meta; // extra data related to the form
    pass: ValidatorResponse; // pass handler response for the form
    qualifications: Record<string, ValidatorResponse>; // selector qualifications of the form
    validations: Record<string, ValidatorResponse>; // selector validations of the form
};

export type PropertyState = {
    data: any;
    isValid: boolean;
    isQualified: boolean;
    validationError: string;
    qualificationError: string;
};

export type PassHandler = (form: Form) => ValidatorResponse;

export type UpdateType = "normal" | "resetQualification";
