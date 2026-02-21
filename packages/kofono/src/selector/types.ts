export interface DataQuerier {
    has(selector: string): boolean;
    get<T>(selector: string): T;
    getOrDefault<T>(selector: string, defaultValue: T): T;
    tryGet(selector: string): [boolean, unknown];
    set(selector: string, value: unknown): void;
    trySet(selector: string, value: unknown): [boolean, string | null];
    delete(selector: string): void;
    tryDelete(selector: string): [boolean, string | null];
}
