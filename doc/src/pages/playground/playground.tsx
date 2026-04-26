import { Editor } from "@kofono/solid-editor";
import {
    ComponentType,
    FormSchemaProvider,
    GridForm
} from "@kofono/solid-form";
import { K, max, min, type Schema } from "kofono";
import { createSignal, Show } from "solid-js";
import { H1, H4, Hr } from "@/components/html";
import { FullScreenLayout } from "@/components/layouts/fullscreen-layout";
import { evalWithContext } from "./schema";

export const Playground: DocComponentPage = {
    title: "Kofono documentation",
    menuTitle: "Playground",
    path: "/playground",
    description: "Kofono playground",
    keywords: ["kofono", "form", "schema", "typescript", "playground"],
    component: RouteComponent,
};
/*

K.schema({
    name: K.string(
            min(1, "Your name must be at least 1 character"),
            max(250, "Your name should not exceed 250 characters!"),
        )
        .component({
            title: "Enter your ndfsdfsdfsdfame",
            description: "Please enter your name",
        }),

    acceptTerms: K.boolean(required()).component({
        type: "checkbox2",
        title:"DO you surrender your soul?"
    })
})
 */

const startingSchemaString = `K.schema({
    name: K.string(
            min(1, "Your name must be at least 1 character"),
            max(250, "Your name should not exceed 250 characters!"),
        )
        .component({
            title: "Enter your ndfsdfsdfsdfame",
            description: "Please enter your name",
        }),

    acceptTerms: K.boolean(required()).component({
        type: "checkbox2",
        title:"DO you surrender your soul?"
    })
})`;
startingSchemaString;

const schema = K.schema({
    name: K.string(
        min(1, "name.min.error"),
        max(250, "name.max.error"),
    ).component({
        type: ComponentType.Input,
        title: "name.title",
        description: "name.description",
    }),
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
});

function RouteComponent() {
    // const [value, setValue] = createSignal<string>(startingSchemaString);
    const [previewSchema, setPreviewSchema] = createSignal<Schema>(schema);
    const [previewSchemaVersion, setPreviewSchemaVersion] = createSignal(1);

    const onEditorChange = (val: string) => {
        console.log("onEditorChange");
        try {
            const schema = evalWithContext(val);
            updateSchema(schema);
        } catch (error) {
            console.error(error);
        }
    };

    const updateSchema = (nextSchema: Schema) => {
        setPreviewSchema(nextSchema);
        setPreviewSchemaVersion(v => v + 1);
    };

    const reloadBtn = () => {
        updateSchema(previewSchema());
    };

    return (
        <FullScreenLayout>
            <H1>Playground</H1>
            <div class="flex flex-row justify-between gap-2">
                <div class="flex-3/5 bg-base-200 p-2">
                    <H4>Schema</H4>
                    <button class="hidden" type="button" onClick={reloadBtn}>
                        reload
                    </button>
                    <Hr class="-mx-2 my-3" />
                    <Editor
                        onChange={onEditorChange}
                        class="p-0"
                        value={JSON.stringify(schema, null, 2)}
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
                    <Hr class="-mx-2 my-3" />
                    <Show when={previewSchemaVersion()} keyed>
                        {_version => (
                            <FormSchemaProvider
                                schema={previewSchema()}
                                locale={"en"}>
                                <GridForm />
                            </FormSchemaProvider>
                        )}
                    </Show>
                </div>
            </div>
        </FullScreenLayout>
    );
}
