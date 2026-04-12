import { describe, expect, it } from "vitest";
import { K } from "../../builder/K";
import { updateCounter } from "./UpdateCounterExtension";

describe("UpdateCounterExtension", () => {
    it("should create correct schema", async () => {
        const schema = K.schema({
            $extensions: [updateCounter()],
        });
        expect(schema).toEqual({
            $extensions: [
                {
                    updateCounter: {},
                },
            ],
            __: {},
        });
    });

    it("should count updates", async () => {
        const form = await K.form({
            $extensions: [updateCounter()],
            propA: K.string(),
        });

        expect(form.state.meta.extensions.updateCounter).toBeDefined();
        expect(form.state.meta.extensions.updateCounter).toBe(0);
        await form.update("propA", "foo");
    });
});
