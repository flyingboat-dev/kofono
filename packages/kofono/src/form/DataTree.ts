import { objectHasKey } from "../common/helpers";
import { arrayPropertyTypes } from "../property/categories";
import type { Property } from "../property/Property";
import { PropertyType } from "../property/types";
import type { SchemaProperty } from "../schema/Schema";
import { DataSelector } from "../selector/DataSelector";
import { removeSelectorBase } from "../selector/helpers";
import type { Data, Properties } from "./types";

export class DataTree {
    generateTree(props: Properties): Data {
        const data: Data = {};
        const selector = new DataSelector();
        for (const [uid, prop] of Object.entries(props)) {
            const value = this.getPropertyValue(prop);
            if (prop.type !== PropertyType.Null) {
                selector.set(uid, value, data);
            }
        }
        return data;
    }

    generatePartialTree(props: Properties, baseSelector: string): Data {
        const data: Data = {};
        const selector = new DataSelector();
        for (const [uid, prop] of Object.entries(props)) {
            if (prop.type !== PropertyType.Null) {
                selector.set(
                    removeSelectorBase(baseSelector, uid),
                    this.getPropertyValue(prop),
                    data,
                );
            }
        }
        return data;
    }

    private getPropertyValue(prop: Property<SchemaProperty>): unknown {
        if (prop.type === PropertyType.Object) {
            return {};
        } else if (objectHasKey(prop.def(), "default")) {
            return prop.def().default;
        } else if (arrayPropertyTypes.includes(prop.type)) {
            return [];
        }
        return null;
    }
}
