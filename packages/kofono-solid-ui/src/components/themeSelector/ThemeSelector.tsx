import { createEffect } from "solid-js";
import { useFormContext } from "@/context";
import { Dropdown, type DropdownOption } from "../dropdown";

export interface ThemeSelectorProps {
    targets?: string[];
}

export function ThemeSelector(props: ThemeSelectorProps) {
    const { store, setTheme } = useFormContext();
    const targets = props.targets || [".form-wrapper"];

    const options: DropdownOption[] = [
        {
            label: "Light",
            value: "default",
        },
        {
            label: "Dark",
            value: "dark",
        },
        {
            label: "Orange",
            value: "orange",
        },
    ];

    const setThemeAttribute = (target: string, theme: string): void => {
        const htmlElement = document.querySelector(`${target}[data-theme]`);
        if (htmlElement) {
            htmlElement.setAttribute("data-theme", theme);
        }
    };

    const getThemeAttribute = (target: string): any => {
        const htmlElement = document.querySelector(`${target}[data-theme]`);
        if (htmlElement) {
            return htmlElement.getAttribute("data-theme");
        }
        return null;
    };

    // Initialize theme from the HTML attribute
    createEffect(() => {
        for (const target of targets) {
            const currentTheme = getThemeAttribute(target);
            if (currentTheme) {
                setTheme(currentTheme);
                return;
            }
        }
    });

    const handleThemeChange = (selectedOption: DropdownOption) => {
        const newTheme = selectedOption.value;
        setTheme(newTheme as string);

        for (const target of targets) {
            setThemeAttribute(target, newTheme as string);
        }
    };

    return (
        <Dropdown
            class="w-40"
            value={store.theme}
            onChange={handleThemeChange}
            options={options}
        />
    );
}
