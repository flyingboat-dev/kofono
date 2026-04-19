import type { Form } from "../form/Form";
import type { SchemaUpdateCounterExtension } from "./UpdateCounter/UpdateCounterExtension";

export interface Extension<TMeta = any> {
    metaName: string;
    metaData: TMeta;

    init(form: Form): Promise<void> | void;
}

export type ExtensionFactoryHandler<TOptions = any> = (
    opts: TOptions,
) => Extension;

export type SchemaExtension =
    | SchemaUpdateCounterExtension
    | Record<string, unknown>;
