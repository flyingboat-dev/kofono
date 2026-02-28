import { describe, expect, it } from "vitest";
import { PropertyValidations } from "./PropertyValidations";

describe("PropertyValidations", () => {
    const pv = () => new PropertyValidations();

    it("between() should return the correct definition for", () => {
        expect(pv().between(1, 2).def).toEqual([
            {
                between: {
                    min: 1,
                    max: 2,
                },
            },
        ]);
        expect(pv().between(1, 2).expect("custom").def).toEqual([
            {
                between: {
                    min: 1,
                    max: 2,
                    error: "custom",
                },
            },
        ]);
    });

    it("email() should return the correct definition for", () => {
        expect(pv().email().def).toEqual(["email"]);
        expect(pv().email().expect("custom").def).toEqual([
            {
                email: {
                    error: "custom",
                },
            },
        ]);
    });

    it("equal() should return the correct definition for", () => {
        expect(pv().equal("test").def).toEqual([
            {
                equal: {
                    value: "test",
                },
            },
        ]);
        expect(pv().equal("test", true).def).toEqual([
            {
                equal: {
                    value: "test",
                    caseSensitive: true,
                },
            },
        ]);
        expect(pv().equal("test", true).expect("custom").def).toEqual([
            {
                equal: {
                    value: "test",
                    caseSensitive: true,
                    error: "custom",
                },
            },
        ]);
    });

    it("valid() should return the correct definition for", () => {
        expect(pv().isValid("test").def).toEqual([
            {
                isValid: {
                    selectors: "test",
                },
            },
        ]);
        expect(pv().isValid(["test", "test2"]).expect("custom").def).toEqual([
            {
                isValid: {
                    selectors: ["test", "test2"],
                    error: "custom",
                },
            },
        ]);
    });

    it("notEmpty() should return the correct definition for", () => {
        expect(pv().notEmpty().def).toEqual(["notEmpty"]);
        expect(pv().notEmpty().expect("custom").def).toEqual([
            {
                notEmpty: {
                    error: "custom",
                },
            },
        ]);
    });

    it("notEqual() should return the correct definition for", () => {
        expect(pv().notEqual("test").def).toEqual([
            {
                notEqual: {
                    value: "test",
                },
            },
        ]);
        expect(pv().notEqual("test", true).def).toEqual([
            {
                notEqual: {
                    value: "test",
                    caseSensitive: true,
                },
            },
        ]);
        expect(pv().notEqual("test").expect("custom").def).toEqual([
            {
                notEqual: {
                    value: "test",
                    error: "custom",
                },
            },
        ]);
    });

    it("password() should return the correct definition for", () => {
        expect(
            pv().password({
                min: 8,
                max: 16,
                specialChars: true,
            }).def,
        ).toEqual([
            {
                password: {
                    min: 8,
                    max: 16,
                    specialChars: true,
                },
            },
        ]);

        expect(
            pv()
                .password({
                    min: 8,
                    max: 16,
                    specialChars: true,
                })
                .expect("custom").def,
        ).toEqual([
            {
                password: {
                    min: 8,
                    max: 16,
                    specialChars: true,
                    error: "custom",
                },
            },
        ]);
    });

    it("min() should return the correct definition for", () => {
        expect(pv().min(5).def).toEqual([
            {
                min: {
                    value: 5,
                },
            },
        ]);
        expect(pv().min(5).expect("custom").def).toEqual([
            {
                min: {
                    value: 5,
                    error: "custom",
                },
            },
        ]);
    });

    it("max() should return the correct definition for", () => {
        expect(pv().max(10).def).toEqual([
            {
                max: {
                    value: 10,
                },
            },
        ]);
        expect(pv().max(10).expect("custom").def).toEqual([
            {
                max: {
                    value: 10,
                    error: "custom",
                },
            },
        ]);
    });

    it("datetime() should return the correct definition with format", () => {
        expect(pv().datetime("yyyy-MM-dd HH:mm:ss").def).toEqual([
            {
                datetime: {
                    format: "yyyy-MM-dd HH:mm:ss",
                },
            },
        ]);
        expect(
            pv().datetime("yyyy-MM-dd HH:mm:ss").expect("custom").def,
        ).toEqual([
            {
                datetime: {
                    format: "yyyy-MM-dd HH:mm:ss",
                    error: "custom",
                },
            },
        ]);
    });

    it("datetime() with custom format should return the correct definition", () => {
        expect(pv().datetime("dd/MM/yyyy").def).toEqual([
            {
                datetime: {
                    format: "dd/MM/yyyy",
                },
            },
        ]);
        expect(pv().datetime("dd/MM/yyyy").expect("custom").def).toEqual([
            {
                datetime: {
                    format: "dd/MM/yyyy",
                    error: "custom",
                },
            },
        ]);
    });

    it("datetime() with min as string should return the correct definition", () => {
        expect(pv().datetime("yyyy-MM-dd", "2023-01-01").def).toEqual([
            {
                datetime: {
                    format: "yyyy-MM-dd",
                    min: "2023-01-01",
                },
            },
        ]);
    });

    it("datetime() with max as string should return the correct definition", () => {
        expect(
            pv().datetime(
                "yyyy-MM-dd HH:mm:ss",
                undefined,
                "2023-12-31 23:59:59",
            ).def,
        ).toEqual([
            {
                datetime: {
                    format: "yyyy-MM-dd HH:mm:ss",
                    max: "2023-12-31 23:59:59",
                },
            },
        ]);
    });

    it("datetime() with both min and max should return the correct definition", () => {
        expect(
            pv().datetime("yyyy-MM-dd", "2023-01-01", "2023-12-31").def,
        ).toEqual([
            {
                datetime: {
                    format: "yyyy-MM-dd",
                    min: "2023-01-01",
                    max: "2023-12-31",
                },
            },
        ]);
    });

    it("url() without options should return the correct definition", () => {
        expect(pv().url().def).toEqual(["url"]);
        expect(pv().url().expect("custom").def).toEqual([
            {
                url: {
                    error: "custom",
                },
            },
        ]);
    });

    it("url() with options should return the correct definition", () => {
        expect(
            pv().url({
                protocols: ["https"],
                hostnames: ["example.com"],
            }).def,
        ).toEqual([
            {
                url: {
                    protocols: ["https"],
                    hostnames: ["example.com"],
                },
            },
        ]);
        expect(
            pv()
                .url({
                    protocols: ["https"],
                    hostnames: ["example.com"],
                })
                .expect("custom").def,
        ).toEqual([
            {
                url: {
                    protocols: ["https"],
                    hostnames: ["example.com"],
                    error: "custom",
                },
            },
        ]);
    });
});
