import { describe, expect, it } from "vitest";
import { K } from "../../builder/K";
import type { State } from "../../form/types";
import { updateCounter } from "./UpdateCounterExtension";

async function getForm(state?: Partial<State>) {
    return await K.form(
        {
            $extensions: [updateCounter("test")],
            propA: K.string(),
        },
        {
            state: state || {},
        },
    );
}

describe("UpdateCounterExtension", () => {
    it("should create correct schema", async () => {
        const schema = K.schema({
            $extensions: [updateCounter("test")],
        });
        expect(schema).toEqual({
            $extensions: [
                {
                    updateCounter: {
                        id: "test",
                    },
                },
            ],
            __: {},
        });
    });

    it("should have proper state meta on start", async () => {
        const form = await getForm();

        expect(form.state.meta.extensions[0]).toBeDefined();
        expect(form.state.meta.extensions[0].id).toBe("test");
        expect(form.state.meta.extensions[0].name).toBe("updateCounter");
        expect(form.state.meta.extensions[0].data).toBe(0);
    });

    it("should have proper extension instance on start", async () => {
        const form = await getForm();

        const extInstance = form.extensions.getByIndex(0);
        expect(extInstance).toBeDefined();
        expect(extInstance?.metaIndex).toBe(0);
        expect(extInstance?.metaId).toBe("test");
        expect(extInstance?.metaName).toBe("updateCounter");
        expect(extInstance?.metaData).toBe(0);
    });

    it("should extension meta data be correct when starting with an existing form state", async () => {
        const form = await getForm({
            meta: {
                hasBeenUpdated: [],
                extensions: [
                    {
                        id: "test",
                        name: "updateCounter",
                        data: 22,
                    },
                ],
            },
        });

        expect(form.state.meta.extensions[0].data).toBe(22);

        const extInstance = form.extensions.getByIndex(0);
        expect(extInstance).toBeDefined();
        expect(extInstance?.metaIndex).toBe(0);
        expect(extInstance?.metaId).toBe("test");
        expect(extInstance?.metaName).toBe("updateCounter");
        expect(extInstance?.metaData).toBe(22);
    });

    it("should update state meta on update", async () => {
        const form = await getForm();
        await form.update("propA", "foo");
        expect(form.state.meta.extensions[0].data).toBe(1);
        await form.update("propA", "foo");
        expect(form.state.meta.extensions[0].data).toBe(2);
    });
});
