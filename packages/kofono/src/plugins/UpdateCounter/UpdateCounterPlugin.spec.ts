import { describe, expect, it } from "vitest";
import { K } from "../../builder/K";
import { updateCounter } from "./UpdateCounterPlugin";

describe("UpdateCounterPlugin", () => {
    it("should create correct schema", async () => {
        const schema = K.schema({
            $plugins: [updateCounter()],
        });
        expect(schema).toEqual({
            $plugins: [
                {
                    updateCounter: {},
                },
            ],
            __: {},
        });
    });

    it("should count updates", async () => {
        const form = await K.form({
            $plugins: [updateCounter()],
            propA: K.string(),
        });

        expect(form.state.meta.plugins.updateCounter).toBeDefined();
        expect(form.state.meta.plugins.updateCounter).toBe(0);
        await form.update("propA", "foo");
    });
});
