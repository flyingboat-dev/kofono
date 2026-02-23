import { expect, test } from "vitest";
import { K } from "../../src";
import { between, condition, min, notEmpty } from "../../src/validator/schema";

test("test example001", async () => {
    const form = await K.form({
        name: K.string().validations(notEmpty()),
        age: K.number().validations(
            between(1, 120, "Age must be between 1 and 120"),
        ),
        email: K.string().$v(x => x.email()),
        address: K.object({
            street: K.string([
                notEmpty(),
                min(1, "Street must be at least 1 char"),
            ]),
            city: K.string().validations(notEmpty()),
            zipCode: K.string().$v(x => x.notEmpty()),
        }),
        sameAddress: K.boolean().default(false),
        billingAddress: K.object({
            street: K.string().$v(x => x.notEmpty()),
            city: K.string().$v(x => x.notEmpty()),
            zipCode: K.string().$v(x => x.notEmpty()),
        }).qualifications(condition(["{data:sameAddress}", "==", false])),
    });

    expect(form.isQualified("billingAddress")).toBeTruthy();

    await form.update("sameAddress", true);

    expect(form.isQualified("billingAddress")).toBeFalsy();

    expect(form.isValid("address.street")).toBeFalsy();
    expect(form.isValid("address.city")).toBeFalsy();
});
