import { propComponent } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { Upload, type UploadsProps } from "@/components/upload/Upload";

export interface UploadComponent
    extends BasicSchemaComponent,
        Omit<
            UploadsProps,
            "onFileAccept" | "onFileReject" | "onFileChange" | "validateFile"
        > {}

export interface FormUploadProps extends FormElementProps {}

export function FormUpload(props: FormUploadProps) {
    const component = propComponent<UploadComponent>(props.property());
    return (
        <>
            <Upload
                label={component.getOrDefault("label", "File")}
                dropzoneLabel={component.getOrDefault(
                    "dropzoneLabel",
                    "Drop your files here",
                )}
                buttonLabel={component.getOrDefault(
                    "buttonLabel",
                    "Choose files!",
                )}
                multiple={component.getOrDefault("multiple", false)}
                maxFiles={component.getOrDefault("maxFiles", 1)}
                disabled={component.getOrDefault("disabled", false)}
                accept={component.getOrDefault("accept", undefined)}
                allowDragAndDrop={component.getOrDefault(
                    "allowDragAndDrop",
                    true,
                )}
                maxFileSize={component.getOrDefault("maxFileSize", 999999999)}
                minFileSize={component.getOrDefault("minFileSize", 0)}
                onFileAccept={() => console.log("ok")}
                onFileReject={() => console.log("ok")}
                onFileChange={() => console.log("ok")}
                // validateFile={() => console.log("ok")}
                // deleteButton={() => console.log("ok")}
            />
        </>
    );
}
