import { describe, expect, it } from "vitest";
import { AbstractValidator } from "./AbstractValidator";

class MockValidator extends AbstractValidator {
    validate() {
        return this.success();
    }
}

describe("AbstractValidator", () => {
    it('should successResponse() return [true, ""]', () => {
        const validator = new MockValidator("test", "validation", {});
        const response = validator.success();
        expect(response).toEqual([true, ""]);
    });

    it('should errorResponse("SOME_ERROR") return [false, "SOME_ERROR"]', () => {
        const validator = new MockValidator("test", "validation", {});
        const response = validator.error("SOME_ERROR");
        expect(response).toEqual([false, "SOME_ERROR"]);
    });

    it("when validator has custom error code, errorResponse() should return it", () => {
        const validator = new MockValidator("test", "validation", {
            error: "CUSTOM_ERROR",
        });
        const response = validator.error("SOME_ERROR");
        expect(response).toEqual([false, "CUSTOM_ERROR"]);
    });

    it("when using addDependencies(), dependencies() should contain them", () => {
        const validator = new MockValidator("test", "validation", {});
        const dependencies = ["dep1", "dep2"];
        validator.addDependencies(dependencies);
        expect(validator.dependencies()).toEqual(dependencies);
    });
});
