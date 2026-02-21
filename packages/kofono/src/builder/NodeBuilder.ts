import type { Form } from "../form/Form";
import { Property } from "../property/Property";
import type { SchemaObjectProperty, SchemaProperty } from "../schema/Schema";
import { joinSelectors } from "../selector/helpers";
import type { Builder } from "./Builder";
import type { PropertyBuilder } from "./types";

export class NodeBuilder<TSchemaType extends SchemaProperty>
    implements PropertyBuilder<TSchemaType>
{
    public constructor(
        protected readonly uid: string,
        protected readonly builder: Builder,
        protected def: TSchemaType,
    ) {}

    object(
        uid: string,
        def: Omit<SchemaObjectProperty, "type">,
    ): NodeBuilder<SchemaObjectProperty> | null {
        const objectDef = {
            type: "object",
            ...def,
        };
        return this.builder.object(joinSelectors(this.uid, uid), objectDef);
    }

    async build(): Promise<Form> {
        return await this.builder.build();
    }

    buildProperty(): Property<TSchemaType> {
        return new Property<TSchemaType>(this.uid, this.def);
    }
}
