import type { Schema } from "@flyingboat/kofono";
import type { JSX } from "solid-js";
import type { SubmitHandler } from "@/components/types";
import { FormSchemaProvider } from "@/context";
import { FormContent } from "./FormContent";
// import { useFormContext } from "@/context/helpers";

export interface ExampleProps {
    schema: Schema;
    locale?: string;
    submit?: SubmitHandler;
    beforeForm?: JSX.Element;
    afterForm?: JSX.Element;
}
export function ExamplePage(props: ExampleProps) {
    return (
        <div class="p-4 rounder-md">
            <FormSchemaProvider schema={props.schema} locale={props.locale}>
                {props.beforeForm}
                <FormContent submit={props.submit} />
                {props.afterForm}
            </FormSchemaProvider>
        </div>
    );
}
