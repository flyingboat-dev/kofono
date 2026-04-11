import { VsDebugStart } from "solid-icons/vs";
import { Landing } from "@/doc/landing";
import { Playground } from "@/doc/playground";
import { SchemaBasics } from "@/doc/schema.basics";
import { SchemaProperties } from "@/doc/schema.properties";
import { SchemaSelectors } from "@/doc/schema.selectors";
import { ValidatorList } from "@/doc/validator.list";
import type { TableOfContents } from "@/types";

export const tableOfContents: TableOfContents = [
    {
        title: "Getting started",
        icon: <VsDebugStart />,
        children: [Landing, Playground],
    },
    {
        title: "Schema",
        children: [
            {
                title: "Basics",
                children: [SchemaBasics, SchemaProperties, SchemaSelectors],
            },
            {
                title: "Validation",
                children: [ValidatorList],
            },
        ],
    },
];
