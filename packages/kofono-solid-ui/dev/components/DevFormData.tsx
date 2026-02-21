import { GenericDataQuerier } from "@flyingboat/kofono";
import { createMemo, For, Show } from "solid-js";
import { useFormContext } from "@/context";

export function DevFormData() {
    const { store } = useFormContext();

    const dataQuerier = createMemo(
        () => new GenericDataQuerier(store.state!.data),
    ); // this will force a re-render when the data changes
    const selectors = () => store.form!.selectors.getAnswerable();

    return (
        <Show when={selectors() && store.state}>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-sm">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Selector
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <For each={selectors()}>
                                        {(selector) => {
                                            return (
                                                <tr>
                                                    <td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {selector}
                                                    </td>
                                                    <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {String(
                                                            dataQuerier().getOrDefault(
                                                                selector,
                                                                "[null]",
                                                            ),
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
}
