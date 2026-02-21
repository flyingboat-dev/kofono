import { expect, test } from "vitest";
import { PropertyType, TreeType } from "../property/types";
import { Builder } from "./Builder";
import { LeafBuilder } from "./LeafBuilder";

test("LeafBuilder test", () => {
    const builder = new Builder();
    const leafBuilder = new LeafBuilder("uid", builder, {
        type: PropertyType.String,
    });
    const prop = leafBuilder.buildProperty();
    expect(prop.treeType).toEqual(TreeType.Leaf);
    expect(prop.type).toEqual(PropertyType.String);
});
