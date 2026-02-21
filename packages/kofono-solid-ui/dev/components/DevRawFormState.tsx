import { Show } from "solid-js";
import { useFormContext } from "@/context";

export function DevRawFormState() {
    const { store } = useFormContext();
    return (
        <Show when={store.state}>
            <pre class="py-2 px-3 bg-gray-100 text-sm">
                <code>{JSON.stringify(store.state, null, 2)}</code>
            </pre>
        </Show>
    );
}
