import type { PropertyType } from "../property/types";
import type { SchemaPropertyValidator } from "../validator/schema";
import type { SchemaProperty } from "./Schema";

// export function o(...args: Record<string, any>[]) {
//     let result = {};
//     for (const arg of args) {
//         result = Object.assign(result, arg);
//     }
//     return result;
// }

export function property(
    id: string,
    type: PropertyType,
    validations: SchemaPropertyValidator[] = [],
    qualifications: SchemaPropertyValidator[] = [],
): {
    [key: string]: SchemaProperty;
} {
    return {
        [id]: {
            type,
            ...optional("$v", validations),
            ...optional("$q", qualifications),
        } as SchemaProperty,
    };
}

function optional(key: string, item: any): { [key: string]: any } | undefined {
    if (item === null || item === undefined) {
        return;
    }
    if (Array.isArray(item) && item.length === 0) {
        return;
    }
    return {
        [key]: item,
    };
}
