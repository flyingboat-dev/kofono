import { type Component, createSignal, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
// @ts-expect-error
import { Dropdown, type DropdownOption } from "@/components/dropdown";
// @ts-expect-error
import { ThemeSwitcher } from "@/components/themeSelector";

import { examplesPages } from "./examples/examples";

const LOCAL_STORAGE_KEY = "form-current-example" as const;

const App: Component = () => {
    const [currentExample, setCurrentExample] = createSignal<string>(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "DefaultForm",
    );
    const options = Object.entries(examplesPages).map(([key, value]) => ({
        value: key,
        label: value.label,
    }));

    const changeExample = (v: DropdownOption) => {
        const example = (v.value as string) ?? "DefaultForm";
        setCurrentExample(example);
        localStorage.setItem(LOCAL_STORAGE_KEY, example);
    };
    return (
        <div class="text-default p-4">
            <div class="flex items-center justify-between">
                <Dropdown
                    onChange={changeExample}
                    options={options}
                    value={currentExample()}
                />
                <ThemeSwitcher />
            </div>

            <For each={Object.keys(examplesPages)}>
                {key => (
                    <ConditionalDynamic name={key} current={currentExample()} />
                )}
            </For>
        </div>
    );
};

function ConditionalDynamic(props: { name: string; current: string }) {
    const component = examplesPages[props.name]?.component || null;
    return (
        <Show when={props.current === props.name}>
            <Dynamic component={component} />
        </Show>
    );
}

export default App;
