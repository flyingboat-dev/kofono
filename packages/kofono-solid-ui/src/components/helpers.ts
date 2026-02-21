import {
    FormComponent,
    type FormProperty,
    type SchemaComponent,
} from "@flyingboat/kofono";
import { isDev as _isDev } from "solid-js/web";
import type { CheckboxComponent } from "@/components/checkbox";
import type { InputComponent } from "./input";
import { C, type ComponentMap } from "./PropElement";

export function propertyHtmlId(prop: FormProperty) {
    return `fc-${prop.selector}`;
}

export function propComponent<T extends SchemaComponent>(
    prop: FormProperty,
): FormComponent<T> {
    return new FormComponent<T>(prop);
}

export function autoPropComponent<K extends keyof ComponentMap = "default">(
    prop: FormProperty,
): FormComponent<ComponentMap[K]> {
    const componentType = prop.get("component.type", "none");
    switch (componentType) {
        case C.Checkbox:
            return new FormComponent<CheckboxComponent>(prop) as FormComponent<
                ComponentMap[K]
            >;
        case C.Input:
            return new FormComponent<InputComponent>(prop) as FormComponent<
                ComponentMap[K]
            >;
        default:
            return new FormComponent(prop) as FormComponent<ComponentMap[K]>;
    }
}

export function isChecked(propValue: any, value: any): boolean {
    if (propValue === undefined || propValue === null || value === false) {
        return false;
    }
    if (Array.isArray(propValue)) {
        return propValue.includes(value);
    }
    return propValue === value;
}

export function isDev(fn: () => void): void {
    if (_isDev) {
        fn();
    }
}
