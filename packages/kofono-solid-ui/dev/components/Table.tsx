import { type JSX, splitProps } from "solid-js";
import { cn } from "@/libs/cn";

export interface TableProps {
    header: JSX.Element;
    body: JSX.Element;
}

export function Table(props: TableProps) {
    return (
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-sm">
                        <table class="min-w-full divide-y divide-secondary">
                            <thead class="bg-primary/10">{props.header}</thead>
                            <tbody class="divide-y divider-success divide-secondary/40">
                                {props.body}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ThProps extends JSX.ThHTMLAttributes<HTMLTableCellElement> {
    children?: JSX.Element;
}

export function Th(props: ThProps) {
    const [local, otherProps] = splitProps(props, ["children"]);
    return (
        <th
            scope="col"
            class="py-3.5 pr-3 pl-3 text-left text-sm font-semibold"
            {...otherProps}>
            {local.children}
        </th>
    );
}

interface TdProps extends JSX.TdHTMLAttributes<HTMLTableCellElement> {
    children?: JSX.Element;
}

export function Td(props: TdProps) {
    const [local, otherProps] = splitProps(props, ["children", "class"]);
    return (
        <td
            class={cn("px-3 py-4 text-sm whitespace-nowrap", local.class || "")}
            {...otherProps}>
            {local.children}
        </td>
    );
}
