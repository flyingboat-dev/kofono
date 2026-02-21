import { Show } from "solid-js";
import { useFormContext } from "@/context";

export function DevFormSchema() {
    const { store } = useFormContext();
    return (
        <Show when={store.schema}>
            <pre class="py-2 px-3 bg-gray-100 text-sm overflow-y-auto">
                <code>{JSON.stringify(store.schema, null, 2)}</code>
            </pre>
        </Show>
    );
}
