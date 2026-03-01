import * as fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { lowerCaseFirst } from "../common/helpers";
import { builtinValidators } from "./builtinValidators";

test("should have all builtin validators registered", async () => {
    const files = await fs.promises.readdir("./src/validator", {
        recursive: true,
    });
    let validators = files.filter(file => file.endsWith("Validator.ts"));
    validators = validators.map(file =>
        lowerCaseFirst(path.basename(file, ".ts").replace("Validator", "")),
    );
    validators = validators.filter(
        file => !["abstract", "generic"].includes(file),
    );

    for (const validator of validators) {
        console.log(validator);
        expect(builtinValidators.find(x => x.name === validator)?.name).toEqual(
            validator,
        );
    }
});
