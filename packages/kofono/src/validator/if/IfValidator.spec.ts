import { describe, expect, it } from "vitest";
import { K } from "../../builder/K";

describe("IfValidator test", () => {
    it("should execute correctly according to the condition provided", async () => {
        const form = await K.form({
            propA: K.string().default("a"),
            propB: K.string()
                .default("yes")
                .$v(x => x.if(["{data:propA}", "==", "a"], ["empty"])),
        });
        expect(form.prop("propB").isValid()).toBe(false);
        await form.update("propA", "b");
        expect(form.prop("propB").isValid()).toBe(true);
    });

    it("should execute correctly according to the condition provided", async () => {
        const form = await K.form({
            propA: K.string().default("a"),
            propB: K.number()
                .default(1)
                .$v(v => v.if(["{data:propA}", "==", "a"], [{ min: 4 }])),
        });
        expect(form.prop("propB").isValid()).toBe(false);

        await form.update("propA", "b");
        expect(form.prop("propB").isValid()).toBe(true);

        await form.update("propA", "a");
        expect(form.prop("propB").isValid()).toBe(false);

        await form.update("propB", 5);
        expect(form.prop("propB").isValid()).toBe(true);
    });

    it("should execute correctly according to a true condition", async () => {
        const form = await K.form({
            propA: K.string().default("a"),
            propB: K.string()
                .default("yes")
                .$v(v => v.if(["a", "==", "a"], ["empty"])),
        });
        expect(form.prop("propB").isValid()).toBe(false);
        await form.update("propB", "");
        expect(form.prop("propB").isValid()).toBe(true);
    });
});
