import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import "./styles.css";
import "../../packages/kofono-solid-form/dist/index.css";

import "@fontsource/roboto-mono/700.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400-italic.css";

import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { For, type ParentProps } from "solid-js";
import { RootLayout } from "@/components/layouts/root-layout";
import { SchemaBasics } from "@/doc/schema.basics";
import { SchemaProperties } from "@/doc/schema.properties";
import { SchemaSelectors } from "@/doc/schema.selectors";
import { ValidatorList } from "@/doc/validator.list";
import { Landing } from "@/pages/landing";
import { Playground } from "@/pages/playground";

const queryClient = new QueryClient();

function App(props: ParentProps) {
    return (
        <MetaProvider>
            <QueryClientProvider client={queryClient}>
                <RootLayout>{props.children}</RootLayout>
            </QueryClientProvider>
        </MetaProvider>
    );
}

const docPages: DocComponentPage[] = [
    Landing,
    Playground,
    SchemaBasics,
    SchemaProperties,
    SchemaSelectors,
    ValidatorList,
];

const rootElement = document.getElementById("app");
if (rootElement) {
    render(
        () => (
            <Router root={App}>
                <For each={docPages}>
                    {d => (
                        <Route path={d.path} component={d.component as any} />
                    )}
                </For>
            </Router>
        ),
        rootElement,
    );
}
