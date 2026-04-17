import type { Component } from "solid-js";
import { AllUiComponentExample } from "./pages/AllUiComponentExample";
import { DefaultFormExample } from "./pages/DefaultFormExample";
import { DisplayComponentsExample } from "./pages/DisplayComponentsExample";
import { DropdownComponentExample } from "./pages/DropdownComponentExample";
import { ThemePage } from "./pages/ThemePage";
import { TranslationsExample } from "./pages/TranslationsExample";
import { ValidatorsExample } from "./pages/ValidatorsExample";

export interface Examples {
    [key: string]: { label: string; component: Component };
}

export const examplesPages: Examples = {
    DefaultForm: {
        label: "Default Form Example",
        component: DefaultFormExample,
    },
    AnotherExample: {
        label: "Another Example",
        component: AllUiComponentExample,
    },
    DropdownComponentExample: {
        label: "Dropdown Component Example",
        component: DropdownComponentExample,
    },
    DisplayComponentsExample: {
        label: "Display Components Example",
        component: DisplayComponentsExample,
    },
    TranslationsExample: {
        label: "Translations Example",
        component: TranslationsExample,
    },
    ValidatorsExample: {
        label: "Validators Example",
        component: ValidatorsExample,
    },
    ThemePreviewExample: {
        label: "Theme preview Example",
        component: ThemePage,
    },
};
