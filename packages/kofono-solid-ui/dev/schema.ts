import { S } from "@flyingboat/kofono";
import type { BasicSchemaComponent } from "@/components/types";
import type { InputComponent } from "../src/components/input";
import { C } from "../src/components/PropElement";

export const schema = S.schema({
    propA: S.string()
        .default("test")
        .validations((v) =>
            v.min(3).expect("should be at least 3 characters or more"),
        )
        .component<InputComponent>({
            type: C.Input,
            title: "Text input",
            subTitle: "This is a subtitle",
            description: "This is a description",
            placeholder: "This is a placeholder",
            grid: 4,
        }),

    propB: S.string().component({
        type: C.Textarea,
        title: "Textarea",
        subTitle: "This is a subtitle",
        description: "This is a description",
        placeholder: "This is a placeholder",
        grid: 4,
    }),

    checkboxes: S.object({
        checkbox1: S.boolean()
            .default(true)
            .component({
                type: C.Checkbox,
                title: "Checkbox title",
                label: "Checkbox label",
                disqualificationBehavior: "disable",
            })
            .qualifications((q) => q.valid("propA")),
        checkbox2: S.boolean()
            .component({
                type: C.Checkbox,
                title: "Checkbox title",
                label: "Checkbox label",
            })
            .qualifications((q) => q.valid("propA")),
    }).component<BasicSchemaComponent>({
        grid: 4,
    }),

    checkboxes2: S.listNumber()
        .enum([
            { value: 1, label: "choice labelchoice label 1" },
            { value: 2, label: "choice labelchoice label 2" },
            { value: 3, label: "choice labelchoice label 3" },
        ])
        .default([2])
        .component({
            type: C.CheckboxGroup,
            title: "Multiple checkboxes question",
            grid: 6,
        }),

    radioGroup: S.string()
        .enum([
            {
                value: "1",
                label: "choice",
            },
            {
                value: "2",
                label: "choice label choice label 2",
            },
            {
                value: "3",
                label: "choice label choice label 3",
            },
        ])
        .component({
            type: C.RadioGroup,
            title: "Radios question",
            label: "Radio label",
            grid: 6,
        }),

    selects: S.object({
        select: S.string()
            .enum([
                {
                    value: "1",
                    label: "choice label choice label 1",
                },
                {
                    value: "2",
                    label: "choice label choice label 2",
                },
            ])
            .component({
                type: C.Select,
                title: "Select question",
                label: "Select label",
                grid: 6,
            }),
        dropdown: S.string()
            .enum([
                {
                    value: "1",
                    label: "choice label choice label 1",
                },
                {
                    value: "2",
                    label: "choice label choice label 2",
                },
                {
                    value: "3",
                    label: "choice label choice label 3",
                },
            ])
            .component({
                type: C.Dropdown,
                title: "Select question",
                label: "Select label",
                grid: 6,
            }),
    }).component<BasicSchemaComponent>({
        grid: 8,
    }),

    // testObject: S.object({
    //     test1: S.string().component({}),
    //     test2: S.string(),
    //     test3: S.string(),
    // }).component({ grid: 6 }),

    date: S.string().component<InputComponent>({
        inputType: "date",
        grid: 4,
    }),

    sliders: S.object({
        slider: S.number()
            .$v((v) => v.min(10).max(125))
            .default(0)
            .component({
                type: C.Slider,
                title: "Slider question",
                label: "Schema Slider label",
            }),
        secondSlider: S.number()
            .$v((v) => v.min(10).max(125))
            .$q((q) => q.valid("sliders.slider"))
            .component({
                type: C.Slider,
                title: "Slider question",
                label: "Schema Slider label",
            }),
    }).component<BasicSchemaComponent>({
        grid: 6,
    }),
});

// propE: S.string().component({ grid: 6 }),

// propF: S.string().component({ grid: 6 }),

// propE: S.array(S.string()).component({ grid: 12 }),

// propD: S.object({
//     propD1: S.string().component({ grid: 6 }),
//     propD6: S.number().component({ grid: 6 }),
//     propD3: S.boolean().component({ grid: 6 }),
// }).component({ grid: 6 }),
//
// propE: S.array(S.string()).component({ grid: 6 }),
//
// propF: S.array(S.number()).component({ grid: 6 }),

// console.log(schema.__);
