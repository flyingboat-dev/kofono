import { Editor } from "@flyingboat/solid-editor";

type CodeBlockProps = {
    value: string;
    language?: "json" | "javascript";
    readonly?: boolean;
    height?: string;
};
export function CodeBlock(props: CodeBlockProps) {
    return (
        <div class="p-3 rounded-md squircle bg-base-200">
            <Editor
                class="p-0"
                value={props.value}
                mode={props.language ?? "javascript"}
                theme="github_dark"
                style={{ height: props.height ?? "200px" }}
                options={{
                    readOnly: props.readonly ?? true,
                    showPrintMargin: false,
                    showLineNumbers: false,
                    showFoldWidgets: false,
                    showGutter: false,
                    highlightActiveLine: false,
                }}
            />
        </div>
    );
}
