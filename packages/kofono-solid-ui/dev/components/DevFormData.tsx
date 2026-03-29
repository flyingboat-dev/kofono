import { GenericDataQuerier } from "kofono";
import { createMemo, For, Show } from "solid-js";
import { useFormContext } from "@/context";
import { Table, Td, Th } from "./Table";

export function DevFormData() {
    const { store } = useFormContext();

    const dataQuerier = createMemo(
        () => new GenericDataQuerier(store.state!.data),
    ); // this will force a re-render when the data changes
    const selectors = () => store.form!.selectors.getAnswerable();

    return (
        <Show when={selectors() && store.state}>
            <Table
                header={
                    <tr>
                        <Th>Selector</Th>
                        <Th>Value</Th>
                    </tr>
                }
                body={
                    <For each={selectors()}>
                        {selector => {
                            return (
                                <tr>
                                    <Td>{selector}</Td>
                                    <Td>
                                        {String(
                                            dataQuerier().getOrDefault(
                                                selector,
                                                "[null]",
                                            ),
                                        )}
                                    </Td>
                                </tr>
                            );
                        }}
                    </For>
                }
            />
        </Show>
    );
}
