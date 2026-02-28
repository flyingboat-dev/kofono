import { expect, test } from "vitest";
import { K } from "../../src";
import {
    between,
    email,
    isTrue,
    max,
    min,
    notEmpty,
    when,
} from "../../src/validator/schema";

test("test example001", async () => {
    const form = await K.form({
        name: K.string(notEmpty()),
        age: K.number(between(1, 120, "Age must be between 1 and 120")),
        email: K.string(email()),
        address: K.object({
            street: K.string([
                notEmpty(),
                min(1, "Street must be at least 1 char"),
            ]),
            city: K.string(notEmpty()),
            zipCode: K.string([min(6), max(7)]),
        }),
        sameAddressForBilling: K.boolean().default(false),
        billingAddress: K.object({
            street: K.string(notEmpty()),
            city: K.string(notEmpty()),
            zipCode: K.string([min(6), max(7)]),
        }).qualifications(when("sameAddressForBilling").isFalse()),
        acceptTerms: K.boolean(isTrue()).default(false),
    });

    expect(form.isQualified("billingAddress")).toBeTruthy();

    await form.update("sameAddressForBilling", true);

    expect(form.isQualified("billingAddress")).toBeFalsy();

    expect(form.isValid("address.street")).toBeFalsy();
    expect(form.isValid("address.city")).toBeFalsy();

    expect(form.pass).toBeFalsy();
});
