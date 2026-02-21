import { describe, expect, it } from "vitest";
import { gridOption2Classes } from "@/layouts/helpers";
import {
    type GridSchemaOption,
    type GridValueType,
    MAX_GRID_VALUE,
} from "@/layouts/types";

describe("gridOption2Classes()", () => {
    type Scenario = {
        grid: GridSchemaOption;
        gridSize: GridValueType | undefined;
        expected: string[];
    };
    const scenarios: Scenario[] = [
        {
            grid: 0 as GridSchemaOption,
            gridSize: undefined,
            expected: ["col-span-1"],
        },
        {
            grid: 0 as GridSchemaOption,
            // @ts-expect-error ts catch the "out of range" grid size, but we still want to test it
            gridSize: 24,
            expected: ["col-span-1"],
        },
        {
            grid: 25 as GridSchemaOption,
            // @ts-expect-error ts catch the "out of range" grid size, but we still want to test it
            gridSize: 24,
            expected: ["col-span-24"],
        },
        {
            grid: 25 as GridSchemaOption,
            gridSize: undefined,
            expected: [`col-span-${MAX_GRID_VALUE}`],
        },
        {
            grid: {
                default: 12,
                lg: 6,
                xl: 4,
            },
            gridSize: undefined,
            expected: ["col-span-12", "lg:col-span-6", "xl:col-span-4"],
        },
    ];

    for (const s of scenarios) {
        it(`when calling with ${JSON.stringify(s.grid)}`, () => {
            expect(gridOption2Classes(s.grid, s.gridSize)).toStrictEqual(
                s.expected,
            );
        });
    }
    const classes = gridOption2Classes(12);
    expect(classes).toHaveLength(1);
});
