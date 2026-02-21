import { expect, test } from "vitest";
import { Form } from "../form/Form";
import { tryBuildSchema } from "./helpers";
import { SchemaBuilderError } from "./SchemaBuilder";

test("tryBuildSchema()", async () => {
    let result = await tryBuildSchema("{}");
    expect(result.form).toBeUndefined();
    expect(result.error).toStrictEqual(
        Error(SchemaBuilderError.MissingRootProperties),
    );

    result = await tryBuildSchema({ __: {} });
    expect(result.form).toBeInstanceOf(Form);
    expect(result.error).toBeUndefined();
});
