import { SchemaBasics } from "@/doc/schema.basics";
import { SchemaProperties } from "@/doc/schema.properties";
import { SchemaSelectors } from "@/doc/schema.selectors";
import { ValidatorList } from "@/doc/validator.list";
import { Landing } from "@/pages/landing";
import { Playground } from "@/pages/playground";
import type { TableOfContents } from "@/types";

export const tableOfContents: TableOfContents = [
    {
        title: "Getting started",
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
