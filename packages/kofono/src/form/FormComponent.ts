import { objectHasKey } from "../common/helpers";
import type { SchemaComponent } from "../schema/Schema";
import type { FormProperty } from "./FormProperty";

/**
 * FormComponent is a class helper meant to be used in a form renderer engine.
 * It uses the property definition SchemaComponent and FormProperty.
 * It is meant to be extended by a form renderer engine to provide additional functionality.
 */
export class FormComponent<TSchemaComponent extends SchemaComponent> {
    protected component: TSchemaComponent;

    public constructor(private readonly prop: FormProperty) {
        this.component = {
            title: "",
            disqualificationBehavior: "hide" as const,
            ...prop.get("component", {}),
        };
    }

    /**
     * Retrieves the value associated with the specified key from the component object if present;
     * otherwise, returns the provided default value.
     *
     * @param key The key to lookup in the component object.
     * @param defaultValue The value to return if the specified key does not exist in the component object.
     * @return The value associated with the key if it exists, otherwise the provided default value.
     */
    public getOrDefault<T>(key: string, defaultValue: T): T {
        if (objectHasKey(this.component as any, key as string)) {
            return this.component[key] as T;
        }
        return defaultValue;
    }

    /**
     * Return the disabled status of the component.
     * If a property is not qualified and the disqualificationBehavior is set to "disable", the component will be disabled.
     * Otherwise, the disabled status value will be the one used in the component.
     */
    get isDisabled(): boolean {
        return (
            (!this.prop.isQualified() &&
                this.disqualificationBehavior === "disable") ||
            this.component["disabled"] === true
        );
    }

    get isReadOnly(): boolean {
        return this.component["readOnly"] === true;
    }

    get type(): string {
        return this.component.type || "";
    }

    get subType(): string {
        return this.component.subType || "";
    }

    get title(): string {
        return this.component.title || "";
    }

    get label(): string {
        return this.component.label || "";
    }

    get description(): string {
        return this.component.description || "";
    }

    get placeholder(): string {
        return this.component.placeholder || "";
    }

    get class(): string {
        const classes = this.component["class"];
        if (Array.isArray(classes)) {
            return classes.join(" ");
        }
        return (classes as string) || "";
    }

    get disqualificationBehavior(): SchemaComponent["disqualificationBehavior"] {
        return this.component.disqualificationBehavior || "hide";
    }
}
