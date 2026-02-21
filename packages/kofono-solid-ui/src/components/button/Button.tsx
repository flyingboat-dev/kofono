import { Button as KButton } from "@kobalte/core/button";
import { type JSX, splitProps } from "solid-js";
import "./style.css";

export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    children: JSX.Element;
    onClick: (e: Event) => void;
}

export function Button(props: ButtonProps) {
    const [local, otherProps] = splitProps(props, [
        "class",
        "children",
        "onClick",
    ]);
    const onClickHandler = async (e: Event) => {
        local.onClick(e);
    };

    return (
        <KButton
            class="button cursor-pointer"
            onClick={onClickHandler}
            {...otherProps}>
            {local.children}
        </KButton>
    );
}
