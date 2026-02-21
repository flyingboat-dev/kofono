// src/components/AceEditor.tsx

import * as ace from "ace-builds";
import { onCleanup, onMount } from "solid-js";
import { defaultOptions } from "./default";
import type { AceOptions } from "./types";

// IMPORTANT: you’ll also import the mode/theme you want:
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-merbivore";

interface AceEditorProps {
    class?: string;
    value?: string;
    onChange?: (value: string) => void;
    mode?: string;
    theme?: string;
    style?: any;
    options?: Partial<AceOptions>;
}

export function Editor(props: AceEditorProps) {
    let editorRef: HTMLDivElement | undefined;

    onMount(() => {
        const opts = { ...defaultOptions, ...props.options };
        opts;

        if (!editorRef) {
            return;
        }

        const editor = ace.edit(editorRef, {
            mode: `ace/mode/${props.mode ?? "javascript"}`,
            theme: `ace/theme/${props.theme ?? "merbivore"}`,
            value: props.value ?? "",
            fontSize: props.options?.fontSize ?? 15,
            fontFamily: "Roboto Mono, monospace",
            highlightActiveLine: props.options?.highlightActiveLine ?? true,
            highlightSelectedWord: props.options?.highlightSelectedWord ?? true,
            readOnly: props.options?.readOnly ?? false,
            showFoldWidgets: props.options?.showFoldWidgets ?? true,
            showGutter: props.options?.showGutter ?? true,
            showLineNumbers: props.options?.showLineNumbers ?? true,
            showPrintMargin: props.options?.showPrintMargin ?? true,
            tabSize: props.options?.tabSize ?? 4,
            useSoftTabs: props.options?.useSoftTabs ?? true,
            wrap: props.options?.wrap ?? true,
            useWorker: false,
        });

        // when content changes, call onChange
        editor.session.on("change", () => {
            const val = editor.getValue();
            props.onChange?.(val);
        });

        onCleanup(() => {
            editor.destroy();
            // remove element if needed
            editorRef!.innerHTML = "";
        });

        // Optionally set size or autosize
        editor.resize();
    });

    return (
        <div
            class={props.class ?? ""}
            ref={editorRef!}
            style={{
                width: props.style?.width ?? "100%",
                height: props.style?.height ?? "auto",
                padding: "8px",
                background: "transparent",
            }}
        />
    );
}
