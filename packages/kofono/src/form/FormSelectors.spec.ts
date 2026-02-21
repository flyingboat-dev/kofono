import { beforeEach, describe, expect, it } from "vitest";
import { K } from "../builder/K";
import type { Form } from "./Form";

describe("FormSelectors", () => {
    let form: Form;
    beforeEach(async () => {
        form = await K.form({
            prop1: K.object({
                propA: K.string(),
                propB: K.object({
                    propB1: K.string(),
                }),
            }),
            prop2: K.string(),
            prop3: K.object({
                propA: K.string(),
                propB: K.string(),
            }),
            name: K.object({
                first: K.string(),
                last: K.string(),
            }),
            name2: K.object({
                first: K.string(),
                last: K.string(),
            }),
        });
    });

    it("getRootSelectors() should return correct selectors", () => {
        expect(form.selectors.getRootSelectors()).toEqual([
            "prop1",
            "prop2",
            "prop3",
            "name",
            "name2",
        ]);
    });

    it("getChildrenSelectors() should return correct selectors", () => {
        expect(form.selectors.getChildrenSelectors("prop1")).toEqual([
            "prop1.propA",
            "prop1.propB",
            "prop1.propB.propB1",
        ]);
        expect(form.selectors.getChildrenSelectors("prop2")).toEqual([]);
        expect(form.selectors.getChildrenSelectors("prop3")).toEqual([
            "prop3.propA",
            "prop3.propB",
        ]);
        expect(form.selectors.getChildrenSelectors("name")).toEqual([
            "name.first",
            "name.last",
        ]);
    });
});
