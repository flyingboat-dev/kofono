import { For, type JSX } from "solid-js";

export type Tab = {
    content: JSX.Element;
    label: string;
    active?: boolean;
};

export type CodeTabsProps = {
    tabs: Tab[];
};

export function CodeTabs(props: CodeTabsProps) {
    const uniqueId = Math.random().toString(36).substring(7);

    return (
        <div class="tabs tabs-box">
            <For each={props.tabs}>
                {(tab) => (
                    <>
                        <input
                            type="radio"
                            name={uniqueId}
                            class="tab"
                            aria-label={tab.label}
                            checked={tab.active}
                        />
                        <div class="tab-content p-2">{tab.content}</div>
                    </>
                )}
            </For>
            {/*<input*/}
            {/*    type="radio"*/}
            {/*    name="my_tabs_6"*/}
            {/*    class="tab"*/}
            {/*    aria-label="Tab 1"*/}
            {/*/>*/}
            {/*<div class="tab-content bg-base-100 border-base-300 p-6">*/}
            {/*    Tab content 1*/}
            {/*</div>*/}

            {/*<input*/}
            {/*    type="radio"*/}
            {/*    name="my_tabs_6"*/}
            {/*    class="tab"*/}
            {/*    aria-label="Tab 2"*/}
            {/*    checked={true}*/}
            {/*/>*/}
            {/*<div class="tab-content bg-base-100 border-base-300 p-6">*/}
            {/*    Tab content 2*/}
            {/*</div>*/}

            {/*<input*/}
            {/*    type="radio"*/}
            {/*    name="my_tabs_6"*/}
            {/*    class="tab"*/}
            {/*    aria-label="Tab 3"*/}
            {/*/>*/}
            {/*<div class="tab-content bg-base-100 border-base-300 p-6">*/}
            {/*    Tab content 3*/}
            {/*</div>*/}
        </div>
    );
}
