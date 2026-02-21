import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import "./styles.css";
import "../../packages/kofono-solid-ui/dist/index.css";

import "@fontsource/roboto-mono/700.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400-italic.css";

import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { For, type ParentProps } from "solid-js";
import { Layout } from "@/components/layout";
import { Landing } from "@/doc/landing";
import { SchemaBasics } from "@/doc/schema.basics";
import { SchemaProperties } from "@/doc/schema.properties";
import { SchemaSelectors } from "@/doc/schema.selectors";

const queryClient = new QueryClient();

function App(props: ParentProps) {
    return (
        <MetaProvider>
            <QueryClientProvider client={queryClient}>
                <Layout>{props.children}</Layout>
            </QueryClientProvider>
        </MetaProvider>
    );
}

const docPages: DocComponentPage[] = [
    Landing,
    SchemaBasics,
    SchemaProperties,
    SchemaSelectors,
];

const rootElement = document.getElementById("app");
if (rootElement) {
    render(
        () => (
            <Router root={App}>
                <For each={docPages}>
                    {(d) => (
                        <Route path={d.path} component={d.component as any} />
                    )}
                </For>
            </Router>
        ),
        rootElement,
    );
}
