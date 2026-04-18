import type { SubmitHandler } from "@/components/types";
import { GridForm } from "@/layouts";
import { DevPanel } from "../components/DevPanel";

export interface FormContentProps {
    submit?: SubmitHandler;
    cancel?: SubmitHandler;
}

export function FormContent(props: FormContentProps) {
    return (
        <div class={`grid grid-cols-12 gap-x-4 mt-4`}>
            <div class="col-span-12 xl:col-span-7">
                <GridForm
                    submit={props.submit}
                    cancel={props.cancel}
                    showLanguageSelector={false}
                    showThemeSelector={true}
                />
            </div>
            <div class="col-span-12 m-0 xl:mt-0 xl:col-span-5 p-0">
                <DevPanel />
            </div>
        </div>
    );
}
