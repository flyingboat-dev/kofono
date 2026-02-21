import { A, useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";
import { H2, H4 } from "@/components/html";
import type {
    TableOfContents as TableOfContentsType,
    TableOfContentsItem,
} from "@/types";
import { cn } from "@/utils";

export type TableOfContentsProps = {
    table: TableOfContentsType;
};

export function TableOfContents(props: TableOfContentsProps) {
    return (
        <ul class="menu w-full grow pt-0 mt-0 px-4">
            <For each={props.table} fallback={<li>Loading...</li>}>
                {(item: TableOfContentsItem) => {
                    if (isDocComponent(item)) {
                        return <LeafContent item={item} />;
                    }
                    return (
                        <>
                            <H2>{item.title}</H2>
                            <NodeContent children={item.children} />
                        </>
                    );
                }}
            </For>
        </ul>
    );
}

function isDocComponent(item: TableOfContentsItem): item is DocComponentPage {
    return (item as DocComponentPage).component !== undefined;
}

function NodeContent(props: { children: TableOfContentsType }) {
    return (
        <div class="my-2">
            <For each={props.children} fallback={<li>Loading2...</li>}>
                {(item: TableOfContentsItem) => {
                    if (isDocComponent(item)) {
                        return <LeafContent item={item} />;
                    }
                    return (
                        <>
                            <H4 class="pl-3 mt-2">{item.title}</H4>
                            <div class="pl-5">
                                <NodeContent children={item.children} />
                            </div>
                        </>
                    );
                }}
            </For>
        </div>
    );
}

function LeafContent(props: { item: DocComponentPage }) {
    const location = useLocation();
    const isActive = createMemo(() => location.pathname === props.item.path);
    return (
        <li>
            <A
                href={props.item.path}
                class={cn(
                    "is-drawer-close:tooltip is-drawer-close:tooltip-right",
                    isActive() && " bg-primary text-primary-content",
                )}
                data-tip={props.item.title}>
                <span class="is-drawer-close:hidden">
                    {props.item.menuTitle ?? props.item.title}
                </span>
            </A>
        </li>
    );
}
