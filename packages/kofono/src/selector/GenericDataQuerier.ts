import { DataSelector } from "./DataSelector";
import type { DataQuerier } from "./types";

export class GenericDataQuerier implements DataQuerier {
    public readonly selector: DataSelector;

    constructor(private data: Record<string, unknown>) {
        this.selector = new DataSelector();
    }

    has(selector: string): boolean {
        return this.selector.has(selector, this.data);
    }

    get<T>(selector: string): T {
        return this.selector.get(selector, this.data) as T;
    }

    getOrDefault<T>(selector: string, defaultValue: T): T {
        const [hasSelector, value] = this.selector.tryGet(selector, this.data);
        return hasSelector ? (value as T) : defaultValue;
    }

    tryGet(selector: string): [boolean, unknown] {
        return this.selector.tryGet(selector, this.data);
    }

    set(selector: string, value: unknown): void {
        this.selector.set(selector, value, this.data);
    }

    trySet(selector: string, value: unknown): [boolean, string | null] {
        return this.selector.trySet(selector, value, this.data);
    }

    delete(selector: string) {
        return this.selector.delete(selector, this.data);
    }

    tryDelete(selector: string): [boolean, string | null] {
        return this.selector.tryDelete(selector, this.data);
    }
}
