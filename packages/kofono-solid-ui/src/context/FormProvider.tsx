import { type Form, type Schema, tryBuildSchema } from "@flyingboat/kofono";
import {
    type Accessor,
    createMemo,
    type JSXElement,
    Show,
    Suspense,
} from "solid-js";
import { unwrap } from "solid-js/store";
import { FormContext } from "./FormContext";
import { createFormStore } from "./store";

export interface FormProviderProps {
    children: JSXElement;
    form: Form;
}

// @deprecated
export function FormProvider(props: FormProviderProps) {
    const store = createFormStore();
    store[2].setForm(props.form);
    return (
        <FormContext.Provider value={store}>
            {props.children}
        </FormContext.Provider>
    );
}

export interface FormSchemaProviderProps {
    children: JSXElement;
    schema: Schema;
    locale?: string;
    exposeForm?: boolean;
}

export function FormSchemaProvider(props: FormSchemaProviderProps) {
    const store = createFormStore();

    store[2].setSchema(props.schema);
    if (props.locale) {
        store[2].setLocale(props.locale);
    }

    const form: Accessor<Promise<Form | null>> = createMemo(async () => {
        // biome-ignore lint/suspicious/noConsole: todo temp
        console.log("Building form from schema", unwrap(props.schema));
        if (!store[0].schema) {
            return null;
        }
        const buildResult = await tryBuildSchema(store[0].schema);
        if (buildResult.error) {
            store[2].setBuildError(buildResult.error);
            return null;
        }
        if (props.exposeForm) {
            window["form"] = buildResult.form;
        }
        store[2].setForm(buildResult.form);
        store[2].setBuildError(null);
        return buildResult.form;
    });

    return (
        <Suspense>
            <Show when={form()} fallback={<div>Loading form...</div>}>
                <FormContext.Provider value={store}>
                    <div class="form-wrapper" data-theme={store[0].theme}>
                        {props.children}
                    </div>
                </FormContext.Provider>
            </Show>
        </Suspense>
    );
}
