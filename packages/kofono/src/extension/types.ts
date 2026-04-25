import type { Form } from "../form/Form";
import type {
    SchemaUpdateCounterExtension
} from "./UpdateCounter/UpdateCounterExtension";

export interface Extension<
    TMetaData = unknown,
    TOptions extends SchemaExtensionBaseOptions = SchemaExtensionBaseOptions,
> {
    defaultMetaData: TMetaData;
    metaId?: string;
    metaIndex: number;
    metaName: string;
    metaData: TMetaData;
    opts: TOptions;
    init(): Promise<void> | void;
}

export type ExtensionContext = {
    form: Form;
    metaIndex: number;
    metaName: string;
};

export type ExtensionFactoryHandler<
    TOptions extends SchemaExtensionBaseOptions = SchemaExtensionBaseOptions,
> = (
    ctx: ExtensionContext,
    opts: TOptions,
) => Promise<Extension<unknown, TOptions>> | Extension<unknown, TOptions>;

export type SchemaExtension =
    | SchemaUpdateCounterExtension
    | Record<string, unknown>;

export type SchemaExtensionBaseOptions = {
    id?: string;
};

export type MetaExtension = {
    id?: string;
    name: string;
    data: any;
};
