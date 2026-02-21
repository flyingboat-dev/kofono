import { K, type Schema } from "@flyingboat/kofono";
import { C } from "@/components/PropElement";
import { ExamplePage } from "../ExamplePage";

const schema: Schema = K.schema({
    $id: "uploads-example",
    files: K.listMixed().component({
        type: C.Upload,
        multiple: true,
    }),
});

export function UploadsExample() {
    return <ExamplePage schema={schema} />;
}
