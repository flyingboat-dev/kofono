import { beforeEach, describe, expect, it } from "vitest";
import { Logs } from "../../src/common/Logs";

describe("FormLogs", () => {
    let log: Logs;
    beforeEach(() => {
        log = new Logs();
    });

    it("should get messages after logging them", () => {
        expect(log.messages).toEqual([]);
        log.info("test");
        expect(log.messages).toEqual([
            {
                message: "test",
                type: "info",
            },
        ]);
        log.warning("test");
        expect(log.messages).toEqual([
            {
                message: "test",
                type: "info",
            },
            {
                message: "test",
                type: "warning",
            },
        ]);
        log.error("test");
        expect(log.messages).toEqual([
            {
                message: "test",
                type: "info",
            },
            {
                message: "test",
                type: "warning",
            },
            {
                message: "test",
                type: "error",
            },
        ]);
    });
});
