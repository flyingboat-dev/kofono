export enum PropertyType {
    Array = "array",
    Boolean = "boolean",
    Object = "object",
    ListBoolean = "list<boolean>",
    ListMixed = "list<mixed>",
    ListNumber = "list<number>",
    ListString = "list<string>",
    Null = "null",
    Number = "number",
    String = "string",
}

export type PropertyValidator = {
    name: string;
    options: Record<string, any> | number | string;
};

export enum TreeType {
    Leaf = "leaf",
    Node = "node",
}

export interface BaseProperty<T> {
    readonly type: PropertyType;
    readonly treeType: TreeType;
    selector: string;

    def(): T;
    get<T>(defKeyPath: string, defaultValue: unknown): T;
    has(defKeyPath: string): boolean;
}
