import type { Form } from "../form/Form";
import type {
    Extension,
    ExtensionContext,
    SchemaExtensionBaseOptions,
} from "./types";

export abstract class BaseExtension<
    TMetaData,
    TOptions extends SchemaExtensionBaseOptions = SchemaExtensionBaseOptions,
> implements Extension<TMetaData, TOptions>
{
    abstract defaultMetaData: TMetaData;
    abstract init(): Promise<void> | void;

    public constructor(
        protected ctx: ExtensionContext,
        public readonly opts: TOptions,
    ) {}

    public get form(): Form {
        return this.ctx.form;
    }

    public get metaData(): TMetaData {
        return this.ctx.form.state.meta.extensions[this.metaIndex].data;
    }

    public set metaData(value: TMetaData) {
        this.ctx.form.state.meta.extensions[this.metaIndex].data = value;
    }

    public get metaId(): string | undefined {
        return this.opts.id;
    }

    public get metaIndex(): number {
        return this.ctx.metaIndex;
    }

    public get metaName(): string {
        return this.ctx.metaName;
    }
}
