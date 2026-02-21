import { createSignal, For, Show } from "solid-js";
import { useFormContext } from "@/context";
import { cn } from "@/libs/cn";
import { DevFormData } from "../components/DevFormData";
import { DevFormSchema } from "../components/DevFormSchema";
import { DevFormValidations } from "../components/DevFormValidations";
import { DevRawFormState } from "../components/DevRawFormState";

interface Tab {
    label: string;
    value: string;
}

export function DevPanel() {
    const { store } = useFormContext();
    const [currentTab, setCurrentTab] = createSignal("data");
    const [tabs, _] = createSignal<Tab[]>([
        { value: "data", label: "Data" },
        { value: "state", label: "State" },
        { value: "schema", label: "Schema" },
        { value: "validations", label: "Validations" },
    ]);
    return (
        <>
            <div class="flex gap-x-4 border-b-4 border-gray-200">
                <For each={tabs()}>
                    {(tab) => (
                        <button
                            class={cn(
                                "py-2 px-3",
                                currentTab() === tab.value &&
                                    "bg-primary font-bold",
                            )}
                            onClick={() => setCurrentTab(tab.value)}>
                            {tab.label}
                        </button>
                    )}
                </For>
            </div>
            <Show when={currentTab() === "state"}>
                <DevRawFormState />
            </Show>
            <Show when={currentTab() === "data" && store.state}>
                <DevFormData />
            </Show>
            <Show when={currentTab() === "schema" && store.schema}>
                <DevFormSchema />
            </Show>
            <Show when={currentTab() === "validations" && store.state}>
                <DevFormValidations />
            </Show>
        </>
    );
}
