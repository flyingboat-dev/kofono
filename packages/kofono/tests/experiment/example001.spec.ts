import { test } from "vitest";
import { K } from "../../src";

test("test prop var ref", async () => {
    const form = await K.form({
        $id: "businessRegistration",
        businessType: K.string()
            .enum([
                { value: "sole_proprietor", label: "Sole Proprietor" },
                { value: "corporation", label: "Corporation" },
                { value: "non_profit", label: "Non-Profit Organization" },
            ])
            .validations((v) =>
                v.notEmpty().expect("Business type is required"),
            ),

        legalName: K.string()
            .validations((v) =>
                v
                    .notEmpty()
                    .min(3)
                    .expect("Legal name must be at least 3 characters"),
            )
            .set("label", "Legal Business Name"),

        taxId: K.string()
            .validations((v) =>
                v.regexp("^[0-9]{9}$").expect("Tax ID must be 9 digits"),
            )
            // Tax ID only required for corporations
            .qualifications((q) =>
                q.when("businessType").equals("corporation"),
            ),

        contact: K.object({
            email: K.string().validations((v) =>
                v.email().expect("Valid email required"),
            ),
            phone: K.string().validations((v) =>
                v
                    .regexp("^\\+?[0-9]{10,15}$")
                    .expect("Invalid phone number format"),
            ),
        }),

        directors: K.array(
            K.object({
                fullName: K.string().validations((v) => v.notEmpty()),
                ownershipPercentage: K.number().validations((v) =>
                    v
                        .min(0)
                        .max(100)
                        .expect("Ownership must be between 0 and 100"),
                ),
            }),
        )
            // Directors required only for corporations
            .qualifications((q) => q.if("businessType").equals("corporation")),

        complianceFlags: K.listBoolean()
            // Only valid if core identity fields are valid
            .qualifications((q) => q.valid("legalName").valid("taxId"))
            .set("label", "Compliance Checklist"),

        registrationDate: K.string()
            .default(() => new Date().toISOString())
            .set("readonly", true),
    });
});
