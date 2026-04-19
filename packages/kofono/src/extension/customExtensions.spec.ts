import { describe, expect, it } from "vitest";
import { K } from "../builder/K";
import type { Form } from "../form/Form";
import type { FormConfig } from "../form/types";
import { BaseExtension } from "./BaseExtension";

type CustomExtensionMeta = {
    value: string;
};

type CustomExtensionOpts = {
    param1: string;
    param2: string;
};

class CustomExtension extends BaseExtension<CustomExtensionMeta> {
    metaName: string = "custom";
    metaData: CustomExtensionMeta = {
        value: "",
    };

    constructor(private opts: CustomExtensionOpts) {
        super();
    }

    init(form: Form): Promise<void> | void {
        this.initMeta(form);
        if (this.opts.param1 && this.opts.param2) {
            // do something
            // console.log("param1", this.opts.param1);
        }
        return undefined;
    }
}

function custom(param1: string, param2: string) {
    return {
        custom: {
            param1,
            param2,
        },
    };
}

describe("Custom extension", () => {
    it("custom extension basic implementation", async () => {
        const config: Partial<FormConfig> = {
            init: ctx => {
                ctx.addExtension("custom", opts => {
                    return new CustomExtension(opts);
                });
            },
        };

        const form = await K.form(
            {
                $extensions: [custom("ok", "foo")],
                name: K.string(),
            },
            config,
        );

        form;

        expect(form.extensions).toHaveLength(1);
        expect(form.extensions[0].metaName).toEqual("custom");
        expect(form.state.meta.extensions).toEqual({
            custom: {
                value: "",
            },
        });
    });
});
