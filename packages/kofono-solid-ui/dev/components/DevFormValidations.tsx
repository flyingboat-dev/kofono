import type { ValidatorResponse } from "@flyingboat/kofono";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { useFormContext } from "@/context";
import { Table, Td, Th } from "./Table";

export function DevFormValidations() {
    const { store } = useFormContext();
    const [validations, setValidations] = createSignal<
        Record<string, ValidatorResponse> | undefined
    >(undefined);

    const selectors = createMemo(() => store.form!.selectors.getLeaf());
    // createEffect(() => {
    //     if (!store.form || !store.form.state.validations) {
    //         return;
    //     }
    //     // Ensure validations are up to date
    //     store.form.state.validations;
    // })

    createEffect(() => {
        if (store.state) {
            setValidations(store.state!.validations);
        }
    });

    return (
        <>
            <Show when={validations()}>
                <Table
                    header={
                        <tr>
                            <Th>selector</Th>
                            <Th>validations</Th>
                        </tr>
                    }
                    body={
                        <For each={selectors()}>
                            {(selector) => {
                                return (
                                    <tr>
                                        <Td>{selector}</Td>
                                        <Td>
                                            <BooleanToString
                                                value={
                                                    validations()![selector][0]
                                                }
                                            />
                                        </Td>
                                    </tr>
                                );
                            }}
                        </For>
                    }
                />
            </Show>
            <Show when={!store.form || !validations()}>werwerwer</Show>
        </>
    );
}

interface BooleanToStringProps {
    value: boolean | unknown;
}

function BooleanToString(props: BooleanToStringProps) {
    return (
        <>
            <Show when={props.value === true}>
                <span class="text-green-500">true</span>
            </Show>
            <Show when={props.value === false}>
                <span class="text-red-500">false</span>
            </Show>
            <Show when={typeof props.value !== "boolean"}>
                <span class="text-gray-500">undefined</span>
            </Show>
        </>
    );
}
