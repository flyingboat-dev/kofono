import type { Form, SchemaComponent } from "@flyingboat/kofono";
import type { Accessor, Setter } from "solid-js";
import type { GridSchemaOption } from "@/layouts/types";

export interface BasicSchemaComponent extends SchemaComponent {
    subTitle?: string;
    grid?: GridSchemaOption;
}

export type UpdateHandler = (name: string, value: unknown) => Promise<void>;

export type PropertiesSignals = Record<string, [Accessor<any>, Setter<any>]>;

export type SubmitHandler = (form: Form) => Promise<void> | void;
