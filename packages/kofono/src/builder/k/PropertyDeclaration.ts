import type {
    SchemaComponent,
    SchemaProperty,
    SchemaPropertyEnum,
} from "../../schema/Schema";
import { PropertyValidations } from "./PropertyValidations";

export class PropertyDeclaration<T = any> {
    constructor(public def: SchemaProperty) {}

    public enum(options: SchemaPropertyEnum<any>[]): PropertyDeclaration {
        this.def.enum = options;
        return this;
    }

    public $v(
        fn: (v: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        return this.validations(fn);
    }

    public validations(
        fn: (v: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        if (!this.def.$v) {
            this.def.$v = [];
        }
        this.def.$v = [...this.def.$v, ...fn(new PropertyValidations()).def];
        return this;
    }

    public $q(
        fn: (q: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        return this.qualifications(fn);
    }

    public qualifications(
        fn: (q: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        if (!this.def.$q) {
            this.def.$q = [];
        }
        this.def.$q = [...this.def.$q, ...fn(new PropertyValidations()).def];
        return this;
    }

    public set(key: string, value: any): PropertyDeclaration {
        this.def[key] = value;
        return this;
    }

    public props(props: Record<string, any>): PropertyDeclaration {
        this.def = { ...this.def, ...props };
        return this;
    }

    public component<T extends SchemaComponent>(value: T): PropertyDeclaration {
        return this.set("component", value);
    }

    public default(value: T): PropertyDeclaration {
        return this.set("default", value);
    }
}
