import { isEmptyString } from "../common/helpers";
import type {
    Extension,
    ExtensionContext,
    SchemaExtensionBaseOptions,
} from "../extension/types";
import type { Form } from "./Form";

export type ExtensionDefinition = [name: string, options: any];

export class FormExtensions {
    #extensions: Extension[] = [];

    constructor(private form: Form) {}

    public get extensions(): Extension[] {
        return this.#extensions;
    }

    public get length(): number {
        return this.#extensions.length;
    }

    public getByIndex<TMetaData, TOptions extends SchemaExtensionBaseOptions>(
        index: number,
    ): Extension<TMetaData, TOptions> | undefined {
        const ext = this.#extensions.find(ext => ext.metaIndex === index);
        if (!ext) {
            return undefined;
        }
        return ext as Extension<TMetaData, TOptions>;
    }

    public getById<TMetaData, TOptions extends SchemaExtensionBaseOptions>(
        id: string,
    ): Extension<TMetaData, TOptions> | undefined {
        const ext = this.#extensions.find(ext => ext.metaId === id);
        if (!ext) {
            return undefined;
        }
        return ext as Extension<TMetaData, TOptions>;
    }

    public async build(extensions: ExtensionDefinition[]) {
        const extensionInstances: Extension[] = [];

        for (const [name, opts] of extensions) {
            if (this.form.extensionsFactory.has(name)) {
                const extFactory = this.form.extensionsFactory.get(name);
                const extContext: ExtensionContext = {
                    form: this.form,
                    metaName: name,
                    metaIndex: this.getMetaIndex(name, opts.id),
                };

                const ext = await extFactory(extContext, opts);

                this.initMetaData(ext);
                await ext.init();

                extensionInstances.push(ext);
            }
        }

        this.#extensions.push(...extensionInstances);
    }

    private getMetaIndex(
        name: string,
        id: string | undefined = undefined,
    ): number {
        if (this.form.state.meta.extensions.length < 1) {
            return 0;
        }

        if (id && !isEmptyString(id)) {
            const index = this.form.state.meta.extensions.findIndex(
                x => x.id === id && x.name === name,
            );
            if (index !== -1) {
                // found existing matching extension state
                return index;
            }

            // existing state not found, put it at the end
            return this.form.state.meta.extensions.length;
        } else if (id === undefined) {
            const index = this.form.state.meta.extensions.findIndex(
                x => x.name === name && x.id === undefined,
            );
            if (index !== -1) {
                // found existing matching extension state
                return index;
            }

            // existing state not found, put it at the end
            return this.form.state.meta.extensions.length;
        }

        return 0;
    }

    private initMetaData(ext: Extension): void {
        if (!this.form.state.meta.extensions[ext.metaIndex]) {
            this.form.state.meta.extensions[ext.metaIndex] = {
                id: ext.metaId,
                name: ext.metaName,
                data: ext.defaultMetaData,
            };
        }
    }
}
