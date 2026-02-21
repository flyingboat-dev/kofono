import type { JSX } from "solid-js";

export type Node = {
    title: string;
    children: TableOfContents;
    meta?: Meta;
    icon?: JSX.Element;
};

export type Meta = {
    keywords?: string[];
    pageTitle?: string;
};

export type TableOfContentsItem = Node | DocComponentPage;

export type TableOfContents = TableOfContentsItem[];
