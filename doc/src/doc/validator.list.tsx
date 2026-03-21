import { builtinValidators } from "@flyingboat/kofono";
import { For } from "solid-js";
import { H1, Spacer } from "@/components/html";

export const ValidatorList: DocComponentPage = {
    path: "/validator-list",
    title: "Validators List",
    menuTitle: "List of validators",
    description: "",
    keywords: [],
    component: RouteComponent,
};

function RouteComponent() {
    return (
        <>
            <H1>Built-in Validators</H1>
            <p>Here the list of Kofono build-in validators</p>
            <Spacer />
            <ul>
                <For each={builtinValidators}>
                    {(validator, _) => <li>{validator.name}</li>}
                </For>
            </ul>
        </>
    );
}
