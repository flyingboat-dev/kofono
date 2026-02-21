import { K, type Schema } from "@flyingboat/kofono";
import { FormSchemaProvider } from "@/context";
import { FormContent } from "../FormContent";

const schema: Schema = K.schema({
    propA: K.string(),
    propB: K.string(),
    propC: K.string(),
});

export function AllUiComponentExample() {
    return (
        <>
            im the default form example
            <FormSchemaProvider schema={schema}>
                <FormContent />
                <div class="p-4">
                    <h2 class="text-lg font-bold"> Additional Content</h2>
                    <p>
                        This is some additional content that can be rendered
                        alongside the form.
                    </p>
                </div>
            </FormSchemaProvider>
        </>
    );
}
