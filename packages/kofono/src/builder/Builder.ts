import { defaultConfig } from "../form/defaults";
import { Form } from "../form/Form";
import type { FormConfig, Properties } from "../form/types";
import { PropertyType } from "../property/types";
import type {
    SchemaArrayProperty,
    SchemaBooleanProperty,
    SchemaListBooleanProperty,
    SchemaListMixedProperty,
    SchemaListNumberProperty,
    SchemaListStringProperty,
    SchemaNullProperty,
    SchemaNumberProperty,
    SchemaObjectProperty,
    SchemaProperty,
    SchemaStringProperty,
} from "../schema/Schema";
import { DuplicatePropertyUidError } from "./Errors";
import { LeafBuilder } from "./LeafBuilder";
import { NodeBuilder } from "./NodeBuilder";
import type { PropertyBuilder } from "./types";

export class Builder {
    protected _builders: Record<string, PropertyBuilder<SchemaProperty>> = {};
    protected _uids: string[] = [];
    protected _errors: Error[] = [];
    //protected _uid: string = "root";

    public async build(config: FormConfig = defaultConfig): Promise<Form> {
        config.properties = {
            ...config.properties,
            ...this.buildProps(),
        };
        const form = new Form(config);
        await form.init();
        return form;
    }

    public buildProps(): Properties {
        const props: Properties = {};
        for (const builder of Object.values(this._builders)) {
            const prop = builder.buildProperty();
            props[prop.selector] = prop;
        }
        return props;
    }

    array(
        uid: string,
        def: Omit<SchemaArrayProperty, "type">,
    ): LeafBuilder<SchemaArrayProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaArrayProperty = {
            ...(def as SchemaArrayProperty),
            type: PropertyType.Array,
        };
        const builder = new LeafBuilder<SchemaArrayProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    listBoolean(
        uid: string,
        def: Omit<SchemaListBooleanProperty, "type">,
    ): LeafBuilder<SchemaListBooleanProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaListBooleanProperty = {
            type: PropertyType.ListBoolean,
            ...def,
        };
        const builder = new LeafBuilder<SchemaListBooleanProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    listNumber(
        uid: string,
        def: Omit<SchemaListNumberProperty, "type">,
    ): LeafBuilder<SchemaListNumberProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaListNumberProperty = {
            type: PropertyType.ListNumber,
            ...def,
        };
        const builder = new LeafBuilder<SchemaListNumberProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    listMixed(
        uid: string,
        def: Omit<SchemaListMixedProperty, "type">,
    ): LeafBuilder<SchemaListMixedProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaListMixedProperty = {
            type: PropertyType.ListMixed,
            ...def,
        };
        const builder = new LeafBuilder<SchemaListMixedProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    listString(
        uid: string,
        def: Omit<SchemaListStringProperty, "type">,
    ): LeafBuilder<SchemaListStringProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaListStringProperty = {
            type: PropertyType.ListString,
            ...def,
        };
        const builder = new LeafBuilder<SchemaListStringProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    boolean(
        uid: string,
        def: Omit<SchemaBooleanProperty, "type">,
    ): LeafBuilder<SchemaBooleanProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaBooleanProperty = {
            type: PropertyType.Boolean,
            ...def,
        };
        const builder = new LeafBuilder<SchemaBooleanProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    object(
        uid: string,
        def: Omit<SchemaObjectProperty, "type">,
    ): NodeBuilder<SchemaObjectProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaObjectProperty = {
            ...(def as SchemaObjectProperty),
            type: PropertyType.Object,
        };
        const builder = new NodeBuilder<SchemaObjectProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    null(
        uid: string,
        def: Omit<SchemaNullProperty, "type">,
    ): LeafBuilder<SchemaNullProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaNullProperty = {
            type: PropertyType.Null,
            ...def,
        };
        const builder = new LeafBuilder<SchemaNullProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    number(
        uid: string,
        def: Omit<SchemaNumberProperty, "type">,
    ): LeafBuilder<SchemaNumberProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaNumberProperty = {
            type: PropertyType.Number,
            ...def,
        };
        const builder = new LeafBuilder<SchemaNumberProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    string(
        uid: string,
        def: Omit<SchemaStringProperty, "type">,
    ): LeafBuilder<SchemaStringProperty> | null {
        if (!this.validateUid(uid)) {
            return null;
        }
        const typedDef: SchemaStringProperty = {
            type: PropertyType.String,
            ...def,
        };
        const builder = new LeafBuilder<SchemaStringProperty>(
            uid,
            this,
            typedDef,
        );
        this._builders[uid] = builder;
        return builder;
    }

    public validateUid(uid: string): boolean {
        if (this._uids.includes(uid)) {
            this._errors.push(new DuplicatePropertyUidError(uid));
            return false;
        }
        this._uids.push(uid);
        return true;
    }

    public errors(): Error[] {
        return this._errors;
    }

    public uids(): string[] {
        return this._uids;
    }
}
