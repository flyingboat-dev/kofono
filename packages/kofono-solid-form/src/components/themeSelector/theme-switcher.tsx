import { VsColorMode } from "solid-icons/vs";
import { For } from "solid-js";
import { cn } from "@/libs";

const themess = [
    // ["light", "acid"],
    // ["dark", "abyss"],
    // ["dark", "aqua"],
    // ["light", "autumn"],
    // ["dark", "black"],
    // ["light", "bumblebee"],
    // ["dark", "business"],
    // ["light", "caramellatte"],
    // ["dark", "coffee"],
    // ["light", "cmyk"],
    // ["light", "corporate"],
    // ["light", "cupcake"],
    // ["light", "cyberpunk"],
    // ["dark", "dark"],
    // ["dark", "dim"],
    // ["dark", "dracula"],
    // ["light", "emerald"],
    // ["light", "fantasy"],
    // ["dark", "forest"],
    // ["light", "garden"],
    // ["dark", "halloween"],
    // ["light", "lemonade"],
    // ["light", "light"],
    // ["light", "lofi"],
    // ["dark", "luxury"],
    // ["dark", "night"],
    // ["light", "nord"],
    // ["light", "pastel"],
    // ["light", "retro"],
    // ["light", "silk"],
    // ["dark", "sunset"],
    // ["dark", "synthwave"],
    // ["light", "valentine"],
    // ["light", "winter"],
    // ["light", "wireframe"],
    ["dark", "andromeda"],
    ["dark", "ayudark"],
    ["dark", "catppuccin"],
    ["dark", "everforest"],
    ["dark", "flexoki"],
    ["dark", "githubdark"],
    ["light", "githublight"],
    ["dark", "gruvbox"],
    ["dark", "kanagawa"],
    ["dark", "monokai"],
    ["dark", "nightfox"],
    ["dark", "nightowl"],
    ["dark", "onedarkpro"],
    ["dark", "rosepine"],
    ["dark", "solarized"],
    ["dark", "tokyonight"],
    ["dark", "vscode"],
];

interface ThemeSwitcherProps {
    class?: string | string[];
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
    // todo: switch to signal
    // const userTheme = localStorage.getItem("theme") || "light";
    const updateTheme = (theme: string) => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };
    function getTheme(): string {
        return localStorage.getItem("theme") || "light";
    }
    return (
        <div class="dropdown dropdown-end">
            <button type="button" class={cn("btn btn-primary", props.class)}>
                <VsColorMode class="inline-block w-6 h-6" />
                <svg
                    aria-hidden="true"
                    width="12px"
                    height="12px"
                    class="inline-block ml-2 h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </button>
            <ul
                tabIndex="-1"
                class="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 mt-2 shadow-2xl">
                <For each={themess}>
                    {theme => (
                        <li class="flex items-left ">
                            <button
                                type="button"
                                class={cn(
                                    "theme-controller btn btn-sm btn-block text-left justify-start",
                                    getTheme() === theme[1] ? "btn-active" : "",
                                )}
                                aria-label={theme[1]}
                                onClick={() => {
                                    updateTheme(theme[1]);
                                    (
                                        document.activeElement as HTMLElement | null
                                    )?.blur();
                                }}>
                                {theme[0] === "light" ? (
                                    <SunIcon />
                                ) : (
                                    <MoonIcon />
                                )}
                                {theme[1]}
                            </button>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
}

function MoonIcon() {
    return (
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24">
            <path d="M21.64 13a1 1 0 0 0-1.05-.14A8 8 0 0 1 11.11 3.4a1 1 0 0 0-1.19-1.33A10 10 0 1 0 22.97 14.1a1 1 0 0 0-1.33-1.1Z" />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
    );
}
