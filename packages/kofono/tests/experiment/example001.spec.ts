import { expect, test } from "vitest";
import { K } from "../../src";

test("test example001", async () => {
    const form = await K.form({
        name: K.string().$v((x) => x.notEmpty()),
        age: K.number().$v((x) =>
            x.between(1, 120).expect("Age must be between 1 and 120"),
        ),
        email: K.string().$v((x) => x.email()),
        address: K.object({
            street: K.string().$v((x) => x.notEmpty()),
            city: K.string().$v((x) => x.notEmpty()),
            zipCode: K.string().$v((x) => x.notEmpty()),
        }),
        sameAddress: K.boolean().default(false),
        billingAddress: K.object({
            street: K.string().$v((x) => x.notEmpty()),
            city: K.string().$v((x) => x.notEmpty()),
            zipCode: K.string().$v((x) => x.notEmpty()),
        }).$q((q) => q.condition("{data:sameAddress}", "==", false)),
    });

    expect(form.isQualified("billingAddress")).toBeTruthy();

    await form.update("sameAddress", true);

    expect(form.isQualified("billingAddress")).toBeFalsy();
});
