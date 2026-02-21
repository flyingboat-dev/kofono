import type { Form, Schema, State } from "@flyingboat/kofono";
import type { Accessor, Setter } from "solid-js";
import type { createFormStore } from "./store";

// https://gist.github.com/alexamy/d69152eae3619a61567a7e89e52797fe
export type FormState = ReturnType<typeof createFormStore>;

export interface FormStore {
    locale: string;
    schema: Schema | null;
    state: State | null;
    form: Form | null;
    propsSignals: Record<string, [Accessor<any>, Setter<any>]>;
    focusedSelector: string | null;
    buildError: Error | null;
    theme: string;
}
