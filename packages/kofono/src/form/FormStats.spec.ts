import { expect, test } from "vitest";
import { allTypes } from "../../tests/_fixtures/schemas/allTypes";

import { buildSchema } from "../builder/helpers";

test("FormStats initialization", async () => {
    const form = await buildSchema(allTypes);
    expect(form.state.stats).toEqual({
        invalid: 0,
        leaf: 9,
        node: 2,
        progression: 100,
        qualified: 9,
        valid: 9,
    });
});
