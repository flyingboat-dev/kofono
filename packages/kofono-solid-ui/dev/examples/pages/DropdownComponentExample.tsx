import { K, type Schema } from "@flyingboat/kofono";
import { ExamplePage } from "../ExamplePage";

const schema: Schema = K.schema({
    propA: K.string()
        .enum([
            { value: 1, label: "Test" },
            { value: 2, label: "Test 2" },
            { value: 3, label: "Test 3" },
            { value: 4, label: "Test 4" },
            { value: 5, label: "Test 5" },
            { value: 6, label: "Test 6" },
            { value: 7, label: "Test 7" },
        ])
        .component({
            type: "dropdown",
            title: "Dropdown",
            placeholder: "Select an option",
            description:
                "This is a description. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }),
});

export function DropdownComponentExample() {
    return <ExamplePage schema={schema} />;
}
