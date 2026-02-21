import type { Form, Schema, State } from "@flyingboat/kofono";
import type { Accessor, Setter } from "solid-js";
import { createStore } from "solid-js/store";
import type { FormStore } from "@/context/types";

function getInitialStore(): FormStore {
    return {
        locale: "en",
        schema: null,
        state: null,
        form: null,
        propsSignals: {},
        focusedSelector: null,
        buildError: null,
        theme: "default",
    };
}

// https://gist.github.com/alexamy/d69152eae3619a61567a7e89e52797fe
export function createFormStore() {
    const initial = getInitialStore();
    const [store, setStore] = createStore<FormStore>(initial);

    // Store API
    function setSchema(schema: Schema | null) {
        setStore("schema", schema);
    }

    function setState(state: State | null) {
        setStore("state", structuredClone(state));
    }

    function setForm(form: Form | null) {
        setStore("form", form);
    }

    function setPropSignal(
        selector: string,
        signal: [Accessor<any>, Setter<any>],
    ) {
        setStore("propsSignals", selector, signal);
    }

    function setFocusedSelector(selector: string | null) {
        setStore("focusedSelector", selector);
    }

    function setBuildError(error: Error | null) {
        setStore("buildError", error);
    }

    function setLocale(locale: string) {
        setStore("locale", locale);
    }

    function setTheme(theme: string) {
        setStore("theme", theme);
    }

    return [
        store,
        setStore,
        {
            setSchema,
            setState,
            setForm,
            setPropSignal,
            setFocusedSelector,
            setBuildError,
            setLocale,
            setTheme,
        },
    ] as const;
}
