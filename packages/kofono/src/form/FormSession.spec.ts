import { describe, expect, it } from "vitest";
import { K } from "../builder/K";

describe("FormSession test", () => {
    it("should update meta", async () => {
        const form = await K.form({
            propA: K.string().default("a"),
        });
        expect(form.session.hasBeenUpdated("propA")).toBeFalsy();
        await form.update("propA", "foo");
        expect(form.session.hasBeenUpdated("propA")).toBeTruthy();
    });
});
