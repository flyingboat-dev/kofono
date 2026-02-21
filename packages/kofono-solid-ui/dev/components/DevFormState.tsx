import type { ValidatorResponse } from "@flyingboat/kofono";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { useFormContext } from "@/context";
import { Table, Td, Th } from "./Table";

export function DevFormState() {
    const { store } = useFormContext();
    const [validations, setValidations] = createSignal<
        Record<string, ValidatorResponse> | undefined
    >(undefined);
    const [qualifications, setQualifications] = createSignal<
        Record<string, ValidatorResponse> | undefined
    >(undefined);

    const data = createMemo(() => {
        if (store.form && store.state?.data) {
            return (selector: string) => {
                const [succeed, val] = store.form!.$.tryGet(selector);
                return succeed ? val : null;
            };
        }
    });
    const selectors = createMemo(() => store.form!.selectors.getLeaf());

    createEffect(() => {
        if (store.state) {
            setValidations(store.state!.validations);
            setQualifications(store.state!.qualifications);
        }
    });

    const isValid = (selector: string) => {
        return validations()?.[selector]?.[0] ?? false;
    };

    const isQualified = (selector: string) => {
        return qualifications()?.[selector]?.[0] ?? false;
    };

    return (
        <>
            <Show when={store.state} fallback={"no state"}>
                <Table
                    header={
                        <>
                            <tr>
                                <Th>Selector</Th>
                                <Th>V</Th>
                                <Th>Q</Th>
                                <Th colspan={2}>Value</Th>
                            </tr>
                        </>
                    }
                    body={
                        <For each={selectors()}>
                            {(selector) => {
                                return (
                                    <>
                                        <tr class="border-b-transparent">
                                            <Td>{selector}</Td>
                                            <Td class="text-cent2er">
                                                <BooleanToEmoji
                                                    value={isValid(selector)}
                                                />
                                            </Td>
                                            <Td class="text-ce2nter ">
                                                <BooleanToEmoji
                                                    value={isQualified(
                                                        selector,
                                                    )}
                                                />
                                            </Td>
                                            <Td colspan={2}>
                                                <span class="font-mono">
                                                    {String(data()!(selector))}
                                                </span>
                                            </Td>
                                        </tr>
                                        <tr>
                                            <Td></Td>
                                        </tr>
                                    </>
                                );
                            }}
                        </For>
                    }
                />
            </Show>
        </>
    );
}

function BooleanToEmoji(props: { value: boolean }) {
    return (
        <>
            <Show when={props.value}>✅</Show>
            <Show when={!props.value}>❌</Show>
        </>
    );
}
//
// interface BooleanToStringProps {
//     value: boolean | unknown;
// }
//
// function BooleanToString(props: BooleanToStringProps) {
//     return (
//         <>
//             <Show when={props.value === true}>
//                 <span class="text-green-500">true</span>
//             </Show>
//             <Show when={props.value === false}>
//                 <span class="text-red-500">false</span>
//             </Show>
//             <Show when={typeof props.value !== "boolean"}>
//                 <span class="text-gray-500">undefined</span>
//             </Show>
//         </>
//     );
// }
