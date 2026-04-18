import { createSignal, For, Show } from "solid-js";
import { useFormContext } from "@/context";
import { cn } from "@/libs/cn";
import { DevFormData } from "./DevFormData";
import { DevFormSchema } from "./DevFormSchema";
import { DevFormValidations } from "./DevFormValidations";
import { DevRawFormState } from "./DevRawFormState";

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
        <div class="border border-(--grid-prop-border) bg-(--grid-prop-bg) rounded-md p-4">
            <div class="flex gap-x-4 border-b-4 border-primary">
                <For each={tabs()}>
                    {tab => (
                        <button
                            type="button"
                            role="tab"
                            class={cn(
                                "py-2 px-3",
                                "rounded-tl-(--radius-box) rounded-tr-(--radius-box)",
                                currentTab() === tab.value &&
                                    "bg-primary text-primary-content",
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
        </div>
    );
}
