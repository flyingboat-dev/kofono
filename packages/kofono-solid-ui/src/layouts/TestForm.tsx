import { type Form, tryBuildSchema } from "@flyingboat/kofono";
import { type Accessor, createMemo, Show, Suspense } from "solid-js";
import { isDev } from "@/components/helpers";
import { updateHandler } from "@/components/reactivity";
import { useFormContext } from "@/context/helpers";
import { GridPropsLayout } from "@/layouts/grid/GridPropsLayout";
import "../index.css";

export type TestFormProps = {};

export function TestForm(_: TestFormProps) {
    const { store, setForm, setState } = useFormContext();

    isDev(() =>
        console.log(
            `%cForm dev mode`,
            `background: #222; color: #bada55; padding: 2px 4px; border-radius: 4px; font-weight: bold;`,
        ),
    );

    const form: Accessor<Promise<Form | null>> = createMemo(async () => {
        const buildResult = await tryBuildSchema(store.schema || "{}");
        if (buildResult.error) {
            console.log(buildResult.error);
            return null;
        }
        // @ts-expect-error
        window["form"] = buildResult.Form;
        setForm(buildResult.form);
        return buildResult.form;
    });

    //
    // createEffect(() => {
    //     console.log(
    //         "REACTED TO SCHEMA CHANGE",
    //         store.schema,
    //         "REACTED TO SCHEMA CHANGE",
    //     );
    // });

    const updateHandlerWrapper = async (selector: string, value: unknown) => {
        if (store.form) {
            await updateHandler(
                store.form!,
                store.propsSignals,
                selector,
                value,
            );
            setState(store.form.state);
        }
    };

    return (
        <>
            ok2
            <Show when={form() != null} fallback={"SHIT"}>
                <div class="isolate">
                    <Suspense fallback={<div>Loading form...</div>}>
                        <Show
                            when={
                                store.schema &&
                                store.form &&
                                store.form!.selectors.getRootSelectors()
                            }>
                            TESTFORM2
                            <div class={`grid grid-cols-12 gap-2 mt-4`}>
                                <GridPropsLayout
                                    selectors={store.form!.selectors.getRootSelectors()}
                                    updateHandler={updateHandlerWrapper}
                                />
                            </div>
                        </Show>
                        {/*<Show when={form()}>{form()!.state.sessionId}</Show>*/}
                        {/*<Show when={props.schema}>*/}
                        {/*    <pre>{JSON.stringify(props.schema, null, 2)}</pre>*/}
                        {/*</Show>*/}
                        <Show when={store.state}>
                            <pre>{JSON.stringify(store.state, null, 2)}</pre>
                        </Show>
                    </Suspense>
                </div>
            </Show>
        </>
    );
}
