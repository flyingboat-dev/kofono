import { describe, it } from "vitest";
import { K } from "../../builder/K";

describe("UpdatesCountPlugin", () => {
    it("should count form updates", async () => {
        const form = await K.form({
            $plugins: [
                {
                    updatesCount: {},
                },
            ],
        });
        form;
    });
});
