import { beforeAll, describe, expect, it, test } from "vitest";
import {
    defaultPassHandler,
    FormEnv,
    PluginsFactory,
    ValidatorErrors,
} from "../";
import { ValidatorsFactory } from "../validator/ValidatorsFactory";
import { ValidValidator } from "../validator/valid/ValidValidator";
import { Builder } from "./Builder";

test("builder object", () => {
    const builder = new Builder();

    const obj = builder.object("main", {
        __: {},
        test: "ok",
    });

    expect(obj).not.toBeNull();
    expect(builder.errors()).toHaveLength(0);
    expect(builder.uids()).toHaveLength(1);
    expect(builder.uids()[0]).toBe("main");
});

test("builder unique uid", () => {
    const builder = new Builder();

    const obj = builder.object("main", {
        __: {},
    });
    const obj2 = builder.object("main", {
        __: {},
    });

    expect(obj).not.toBeNull();
    expect(obj2).toBeNull();
    expect(builder.errors()).toHaveLength(1);
    expect(builder.uids()).toHaveLength(1);
    expect(builder.errors()[0].message).toBe("Duplicate property uid: main");
});

test("builder nested obj", () => {
    const builder = new Builder();

    const obj = builder.object("main", {});
    const subObj = obj?.object("second", {
        __: {},
    });

    const aString = builder.string("aString", {});
    expect(aString).not.toBeNull();
    expect(obj).not.toBeNull();
    expect(subObj).not.toBeNull();

    // biome-ignore lint/style/noNonNullAssertion: won't be called because the above expect.not.null
    const prop = subObj!.buildProperty();

    expect(prop.selector).toBe("main.second");
    expect(builder.errors()).toHaveLength(0);
    expect(builder.uids()).toHaveLength(3);
});

test("Builder simplified syntax", async () => {
    const builder = new Builder();

    builder.string("propA", {
        $v: ["notEmpty"],
    });

    const form = await builder.build();
    expect(form.hasProp("propA")).toBeTruthy();
    expect(form.$v("propA")).toEqual([false, ValidatorErrors.NotEmpty.IsEmpty]);
});

describe("Builder FormConfig", () => {
    let builder: Builder;
    beforeAll(() => {
        builder = new Builder();
    });

    it("default config should be set to prod", async () => {
        const form = await builder.build();
        expect(form.env).toEqual("prod");
    });

    it("custom config should be set", async () => {
        const customValidatorsFactory = new ValidatorsFactory();
        let passHandler = false;
        customValidatorsFactory.register("fake", () => {
            return new ValidValidator("foo", "validation", {
                selectors: "foo",
            });
        });
        const form = await builder.build({
            env: FormEnv.test,
            validatorsFactory: customValidatorsFactory,
            pluginsFactory: new PluginsFactory(),
            properties: {},
            passHandler: (form) => {
                passHandler = true;
                return defaultPassHandler(form);
            },
            vars: {},
        });
        expect(form.env).toEqual(FormEnv.test);
        expect(passHandler).toBeTruthy();
        expect(form.validators.has("fake")).toBeTruthy();
        expect(form.validators.has("notEmpty")).toBeTruthy();
    });
});
