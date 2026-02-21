import { allPropertyTypes } from "@flyingboat/kofono";
import { For } from "solid-js";
import { H1 } from "@/components/html";

export const Route = createFileRoute({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <H1>Property types:</H1>
            <p>Kofono supports the following property types:</p>
            <ul>
                <For each={allPropertyTypes}>
                    {(type) => (
                        <li>
                            <code>{type}</code>
                        </li>
                    )}
                </For>
            </ul>
        </>
    );
}
