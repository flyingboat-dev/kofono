import type { Form } from "../form/Form";
import { Property } from "../property/Property";
import type { SchemaProperty } from "../schema/Schema";
import type { Builder } from "./Builder";
import type { PropertyBuilder } from "./types";

export class LeafBuilder<TSchemaType extends SchemaProperty>
    implements PropertyBuilder<TSchemaType>
{
    public constructor(
        protected readonly uid: string,
        protected readonly builder: Builder,
        protected def: TSchemaType,
    ) {}

    async build(): Promise<Form> {
        return await this.builder.build();
    }

    buildProperty(): Property<TSchemaType> {
        return new Property<TSchemaType>(this.uid, this.def);
    }
}
