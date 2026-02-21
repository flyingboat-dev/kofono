import { beforeAll, describe, expect, it } from "vitest";
import { K } from "../../builder/K";
import type { Form } from "../../form/Form";

describe("isNotValidValidator", () => {
    let form: Form;

    beforeAll(async () => {
        form = await K.form({
            propA: K.string().$v((v) => v.notEmpty()),
            propB: K.string().$q((v) => v.notValid("propA")),
        });
    });

    it("propB should be qualified on load", async () => {
        expect(form.$q("propB")[0]).toBeTruthy();
        await form.update("propA", "a");
        expect(form.$q("propB")[0]).toBeFalsy();
    });
});
