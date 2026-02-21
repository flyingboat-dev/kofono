import { isObjectLiteral } from "@flyingboat/kofono";
import {
    type GridSchemaOption,
    type GridValueType,
    MAX_GRID_VALUE,
} from "./types";

export function gridOption2Classes(
    grid: GridSchemaOption | undefined,
    gridSize: GridValueType = MAX_GRID_VALUE,
): string[] {
    gridSize = validGridNumber(gridSize, gridSize);
    if (typeof grid === "number") {
        return [`col-span-${validGridNumber(grid, gridSize)}`];
    } else if (isObjectLiteral(grid)) {
        const classes: string[] = [];

        if (grid.default) {
            classes.push(`col-span-${validGridNumber(grid.default, gridSize)}`);
        } else {
            classes.push(`col-span-${gridSize}`);
        }

        if (grid.sm) {
            classes.push(
                `sm:col-span-${validGridNumber(grid.default, grid.sm)}`,
            );
        }
        if (grid.md) {
            classes.push(
                `md:col-span-${validGridNumber(grid.default, grid.md)}`,
            );
        }
        if (grid.lg) {
            classes.push(
                `lg:col-span-${validGridNumber(grid.default, grid.lg)}`,
            );
        }
        if (grid.xl) {
            classes.push(
                `xl:col-span-${validGridNumber(grid.default, grid.xl)}`,
            );
        }
        if (grid.xxl) {
            classes.push(
                `xxl:col-span-${validGridNumber(grid.default, grid.xxl)}`,
            );
        }
        return classes;
    }
    return [];
}

function validGridNumber(
    grid: any,
    gridSize: any = MAX_GRID_VALUE,
): GridValueType {
    if (typeof grid !== "number") {
        return validGridNumber(MAX_GRID_VALUE, gridSize);
    }
    if (grid < 1) {
        return 1;
    } else if (grid > gridSize) {
        return gridSize;
    }
    return grid as GridValueType;
}
