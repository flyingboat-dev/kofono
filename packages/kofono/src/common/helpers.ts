export function objectHasKey(obj: Record<string, any>, key: string): boolean {
    if (!obj) {
        return false;
    }
    return Object.hasOwn(obj, key);
}

export function isObjectLiteral(value: any): value is Record<string, any> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        typeof value.constructor === "function" &&
        value.constructor.name === "Object"
    );
}

export function uuidV4(): string {
    return crypto.randomUUID();
}

export function isEmptyString(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }
    return value.trim().length === 0;
}

export function optional(key: string, value: any): any {
    if (value === undefined) {
        return {};
    }
    return {
        [key]: value,
    };
}
