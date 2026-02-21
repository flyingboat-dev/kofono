import { VsDebugStart } from "solid-icons/vs";
import { Landing } from "@/doc/landing";
import { SchemaBasics } from "@/doc/schema.basics";
import { SchemaProperties } from "@/doc/schema.properties";
import { SchemaSelectors } from "@/doc/schema.selectors";
import type { TableOfContents } from "@/types";

export const tableOfContents: TableOfContents = [
    {
        title: "Getting started",
        icon: <VsDebugStart />,
        children: [Landing],
    },
    {
        title: "Schema",
        children: [
            {
                title: "Basics",
                children: [SchemaBasics, SchemaProperties, SchemaSelectors],
            },
        ],
    },
];
