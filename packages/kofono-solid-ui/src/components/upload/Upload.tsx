import {
    type Details,
    type FileError,
    FileField,
    type FileRejection,
} from "@kobalte/core/file-field";
import { Button } from "@/components/button";
import "./style.css";

export interface UploadsProps {
    label?: string; // default: File Field
    dropzoneLabel?: string; // default: Drop your files here...
    buttonLabel?: string; // default: Choose files!
    multiple?: boolean;
    maxFiles?: number;
    disabled?: boolean;
    accept?: string | string[] | undefined;
    allowDragAndDrop?: boolean;
    maxFileSize?: number;
    minFileSize?: number;
    onFileAccept?: (files: File[]) => void;
    onFileReject?: (files: FileRejection[]) => void;
    onFileChange?: (details: Details) => void;
    validateFile?: (file: File) => FileError[];
    deleteButton?: (file: File) => string;
}

export function Upload(props: UploadsProps) {
    return (
        <FileField
            class="FileField"
            multiple={props.multiple || false}
            disabled={props.disabled || false}
            maxFiles={props.maxFiles || 1}
            minFileSize={props.minFileSize || undefined}
            maxFileSize={props.maxFileSize || undefined}
            onFileAccept={props.onFileAccept || undefined}
            onFileReject={props.onFileReject || undefined}
            onFileChange={props.onFileChange || undefined}>
            <FileField.Label class="FileField__label">
                {props.label}
            </FileField.Label>
            <FileField.Dropzone class="FileField__dropzone">
                {props.dropzoneLabel}
                <FileField.Trigger class="">
                    <Button onClick={() => console.log("ok")}>
                        {props.buttonLabel}
                    </Button>
                </FileField.Trigger>
            </FileField.Dropzone>
            <FileField.HiddenInput />
            <FileField.ItemList class="FileField__itemList">
                {(file) => (
                    <FileField.Item class="FileField__item">
                        <FileField.ItemPreviewImage class="FileField__itemPreviewImage" />
                        <FileField.ItemName class="FileField__itemName" />
                        <FileField.ItemSize class="FileField__itemSize" />
                        <FileField.ItemDeleteTrigger class="FileField__itemDeleteTrigger">
                            Delete {file.name}
                        </FileField.ItemDeleteTrigger>
                    </FileField.Item>
                )}
            </FileField.ItemList>
        </FileField>
    );
}
