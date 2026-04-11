import { Editor } from "@kofono/solid-editor";
import { ComponentType, FormSchemaProvider, GridForm } from "@kofono/solid-ui";
import { K, max, min, Schema } from "kofono";
import { createSignal } from "solid-js";
import { H1, H4, Hr } from "@/components/html";
import { FullScreenLayout } from "@/components/layouts/fullscreen-layout";

export const Playground: DocComponentPage = {
    title: "Kofono documentation",
    menuTitle: "Playground",
    path: "/playground",
    description: "Kofono playground",
    keywords: ["kofono", "form", "schema", "typescript", "playground"],
    component: RouteComponent,
};

const startingSchemaString = `K.schema({
    name: K.string(
            min(1, "Your name must be at least 1 character"), 
            max(250, "Your name should not exceed 250 characters!"),
        )
        .component({
            title: "Enter your name",
            description: "Please enter your name",
        }),
})`;

const schema = K.schema({
    $translations: {
        en: {
            name: {
                title: "Enter your name",
                description: "Enter your first name only",
                "min.error": "Your name must be at least 1 character",
                "max.error": "Your name should not exceed 250 characters!",
            },
        },
    },
    name: K.string(
        min(1, "name.min.error"),
        max(250, "name.max.error"),
    ).component({
        type: ComponentType.Input,
        title: "name.title",
        description: "name.description",
    }),
});

function RouteComponent() {
    const [value, setValue] = createSignal<string>(startingSchemaString);
    const [previewSchema, setPreviewSchema] = createSignal<Schema>(schema);

    const onEditorChange = (val: string) => {
        console.log("onEditorChange");
        // setValue(val);
        // biome-ignore lint/security/noGlobalEval: todo: to replace
        const schema = eval(val);
        setPreviewSchema(schema);
        console.log("schema", schema);
    };
    return (
        <FullScreenLayout>
            <H1>Playground</H1>
            <div class="flex flex-row justify-between gap-2">
                <div class="flex-3/5 bg-base-200 p-2">
                    <H4>Schema</H4>
                    <Hr class="-mx-2 my-1" />
                    <Editor
                        onChange={onEditorChange}
                        class="p-0"
                        value={value()}
                        mode={"javascript"}
                        theme="github_dark"
                        style={{ height: "500px", width: "100%" }}
                        options={{
                            showPrintMargin: false,
                            showLineNumbers: true,
                            showFoldWidgets: true,
                            showGutter: true,
                            highlightActiveLine: false,
                        }}
                    />
                </div>
                <div class="flex-2/5 bg-base-200 p-2">
                    <H4>Preview</H4>
                    <Hr class="-mx-2 my-1" />
                    <FormSchemaProvider schema={previewSchema()} locale={"en"}>
                        <GridForm></GridForm>
                    </FormSchemaProvider>
                </div>
            </div>
        </FullScreenLayout>
    );
}
