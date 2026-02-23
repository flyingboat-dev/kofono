import type {
    SchemaComponent,
    SchemaProperty,
    SchemaPropertyEnum,
} from "../../schema/Schema";
import type { SchemaPropertyValidator } from "../../validator/schema";
import { PropertyValidations } from "./PropertyValidations";

export class PropertyDeclaration<T = any> {
    constructor(public def: SchemaProperty) {}

    public enum(options: SchemaPropertyEnum<any>[]): PropertyDeclaration {
        this.def.enum = options;
        return this;
    }

    // old chained way of adding validations
    public $v(
        fn: (v: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        if (!this.def.$v) {
            this.def.$v = [];
        }
        this.def.$v = [...this.def.$v, ...fn(new PropertyValidations()).def];
        return this;
    }

    public validations(
        validators: SchemaPropertyValidator | SchemaPropertyValidator[] = [],
    ): PropertyDeclaration {
        if (!Array.isArray(validators)) {
            validators = [validators];
        }

        this.def.$v = Array.isArray(this.def.$v)
            ? [...this.def.$v, ...validators]
            : validators;

        return this;
    }

    // old chained way of adding qualifications
    public $q(
        fn: (q: PropertyValidations) => PropertyValidations,
    ): PropertyDeclaration {
        if (!this.def.$q) {
            this.def.$q = [];
        }
        this.def.$q = [...this.def.$q, ...fn(new PropertyValidations()).def];
        return this;
    }

    public qualifications(
        validators: SchemaPropertyValidator | SchemaPropertyValidator[] = [],
    ): PropertyDeclaration {
        if (!Array.isArray(validators)) {
            validators = [validators];
        }
        this.def.$q = validators;
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
