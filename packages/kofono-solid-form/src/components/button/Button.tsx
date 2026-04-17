import { type JSX, splitProps } from "solid-js";

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
        <button
            class="btn btn-primary"
            onClick={onClickHandler}
            {...otherProps}>
            {local.children}
        </button>
    );
}
