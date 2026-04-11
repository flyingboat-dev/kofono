import type { JSX } from "solid-js";
import { propComponent } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { Button } from "./Button";

export interface ButtonComponent extends BasicSchemaComponent {}

export interface FormButtonProps extends PropElementProps {
    onClick: (e: Event) => void;
    children: JSX.Element;
}

export function FormButton(props: FormButtonProps) {
    const component = propComponent(props.property());

    const onClickHandler = async (e: Event) => {
        props.onClick(e);
    };

    return (
        <Button onClick={onClickHandler} disabled={component.isDisabled}>
            {props.children}
        </Button>
    );
}
