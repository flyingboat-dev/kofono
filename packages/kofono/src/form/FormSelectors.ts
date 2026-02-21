import { answerablePropertyTypes } from "../property/categories";
import { TreeType } from "../property/types";
import { DataSelector } from "../selector/DataSelector";
import type { Form } from "./Form";

export class FormSelectors {
    public constructor(private form: Form) {}

    public getRootSelectors(): string[] {
        const selectors: string[] = [];
        for (const selector of this.form.propsKeys()) {
            if (!selector.includes(DataSelector.separator)) {
                selectors.push(selector);
            }
        }
        return selectors;
    }

    public getChildrenSelectors(parent: string): string[] {
        parent = parent + DataSelector.separator;
        const selectors: string[] = [];
        for (const selector of this.form.propsKeys()) {
            if (selector.startsWith(parent) && selector !== parent) {
                selectors.push(selector);
            }
        }
        return selectors;
    }

    public getLeaf(): string[] {
        const selectors: string[] = [];
        for (const selector of this.form.propsKeys()) {
            if (this.form.rawProp(selector).treeType === TreeType.Leaf) {
                selectors.push(selector);
            }
        }
        return selectors;
    }

    public getAnswerable(): string[] {
        const selectors: string[] = [];
        for (const selector of this.form.propsKeys()) {
            if (
                answerablePropertyTypes.includes(
                    this.form.rawProp(selector).type,
                )
            ) {
                selectors.push(selector);
            }
        }
        return selectors;
    }
}
