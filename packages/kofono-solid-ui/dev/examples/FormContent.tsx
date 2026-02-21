import type { SubmitHandler } from "@/components/types";
import { GridForm } from "@/layouts";
import { DevPanel } from "./DevPanel";

export interface FormContentProps {
    submit?: SubmitHandler;
}

export function FormContent(props: FormContentProps) {
    return (
        <>
            <div class={`grid grid-cols-12 gap-x-4 mt-4`}>
                <div class="col-span-12 xl:col-span-7">
                    <GridForm
                        submit={props.submit}
                        showLanguageSelector={true}
                        showThemeSelector={true}
                    />
                </div>
                <div class="col-span-12 mt-14 xl:mt-0 xl:col-span-5 p-4">
                    <DevPanel />
                </div>
            </div>
        </>
    );
}
