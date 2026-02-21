import { K, type Schema } from "@flyingboat/kofono";
import { C } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { ExamplePage } from "../ExamplePage";

const schema: Schema = K.schema({
    paragraphs: K.object({
        a: K.null() // property of type null don't have data, they are mainly used for display/ui stuff by the form renderer
            .component({
                type: C.Paragraph,
                content: <div>This is a paragraph!</div>,
                grid: 6,
            }),
        b: K.null().component({
            type: C.Paragraph,
            content: <div>This is a paragraph!</div>,
            grid: 6,
        }),
        c: K.null().component({
            type: C.Paragraph,
            content: <div>This is a paragraph!</div>,
            grid: 6,
        }),
        d: K.null().component({
            type: C.Paragraph,
            content: (
                <div>
                    This is a paragraph! Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. This is a paragraph! Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. This is a paragraph!
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    This is a paragraph! Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. This is a paragraph! Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. This is a paragraph!
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                </div>
            ),
            grid: 6,
        }),
    }).component<BasicSchemaComponent>({ grid: 12 }),
});

export function DisplayComponentsExample() {
    return <ExamplePage schema={schema} />;
}
