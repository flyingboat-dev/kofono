import { expect, test } from "vitest";
import { K } from "../../src";
import {
    between,
    condition,
    email,
    min,
    notEmpty,
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
            zipCode: K.string(notEmpty()),
        }),
        sameAddressForBilling: K.boolean().default(false),
        billingAddress: K.object({
            street: K.string(notEmpty()),
            city: K.string(notEmpty()),
            zipCode: K.string(notEmpty()),
        }).qualifications(
            condition(["{data:sameAddressForBilling}", "==", false]),
        ),
    });

    expect(form.isQualified("billingAddress")).toBeTruthy();

    await form.update("sameAddressForBilling", true);

    expect(form.isQualified("billingAddress")).toBeFalsy();

    expect(form.isValid("address.street")).toBeFalsy();
    expect(form.isValid("address.city")).toBeFalsy();
});
