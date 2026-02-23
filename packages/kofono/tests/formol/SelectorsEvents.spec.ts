import { expect, test } from "vitest";
import { buildSchema } from "../../src";
import { Events } from "../../src/form/events/types";

// cannot tests events by manually creating a FormEvents instance because events user form.event instead
test("FormEvents test", async () => {
    const f = await buildSchema({
        __: {
            propA: {
                type: "string",
            },
        },
    });

    let i = 0;
    f.events.onSelector("propA", Events.SelectorValidation, () => {
        i += 1;
        return [true, ""];
    });

    expect(f.events.selectorsEvents).toEqual({
        propA: {
            [Events.SelectorValidation]: [expect.any(Function)],
            [Events.SelectorQualification]: [],
        },
    });

    f.events.on(Events.SelectorAfterUpdate, () => {
        i += 1;
    });

    expect(f.events.globalEvents).toEqual({
        [Events.SelectorAfterUpdate]: [expect.any(Function)],
    });

    await f.events.emitSelector("propA", Events.SelectorValidation, {
        form: f,
        selector: "propA",
        value: 245,
    });
    expect(i).toEqual(1);

    await f.events.emit(Events.SelectorAfterUpdate, {
        id: f.updateId(),
        selector: "propA",
        newValue: 9,
        oldValue: 1,
    });
    expect(i).toEqual(2);
});

test("FormEvents selector events dependencies", async () => {
    const f = await buildSchema({
        __: {
            propA: {
                type: "string",
            },
            propB: {
                type: "string",
            },
        },
    });

    f.events.onSelector(
        "propA",
        Events.SelectorValidation,
        ctx => {
            if (ctx.form.$d("propB") === "foo") {
                return [false, "propB is foo!"];
            }
            return [true, ""];
        },
        ["propB"],
    );

    expect(f.$v("propA")).toEqual([true, ""]);
    await f.update("propB", "foo");
    expect(f.$v("propA")).toEqual([false, "propB is foo!"]);
});
