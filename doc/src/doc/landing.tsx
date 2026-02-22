import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";
import { H1, Spacer, StrongAccent } from "@/components/html";

export const Landing: DocComponentPage = {
    title: "Kofono documentation",
    menuTitle: "Overview",
    path: "/",
    description: "Kofono official documentation",
    keywords: ["kofono", "form", "schema", "typescript"],
    component: Content,
};

function Content() {
    return (
        <>
            <H1 class="font-bold text-3xl">Kofono documentation</H1>
            <H1>What is Kofono?</H1>

            <p>
                Kofono is a <StrongAccent>headless form engine</StrongAccent>{" "}
                for TypeScript. Define forms with a schema-first approach
                inspired by JSON Schema, then render and validate them frontend
                or backend without duplicating logic.
            </p>

            <Spacer />

            <H1>Why Kofono</H1>
            <p>
                Forms are essential and often fragile. Kofono centralizes
                structure, validation, and types so your forms stay predictable
                and maintainable as requirements grow.
            </p>
            <ul class="list-disc pl-5 flex flex-col gap-3">
                <li>
                    <StrongAccent>Strongly typed schemas</StrongAccent>:
                    describe your data once and get end-to-end type safety.
                </li>
                <li>
                    <StrongAccent>Complex flows</StrongAccent>: conditionals,
                    nested objects/arrays, dynamic defaults, and more.
                </li>
                <li>
                    <StrongAccent>Single source of truth</StrongAccent>: reuse
                    the same schema for UI rendering, server validation, and
                    tests.
                </li>
                <li>
                    <StrongAccent>Validation engine</StrongAccent>: built-in
                    rules plus custom validators you control.
                </li>
                <li>
                    <StrongAccent>Headless</StrongAccent>: bring your own UI
                    (React, Vue, Svelte, vanilla) or render on the server.
                </li>
                <li>
                    <StrongAccent>Extensible</StrongAccent>: compose plugins,
                    validators, and custom renderers without forking the core.
                </li>
            </ul>

            <Spacer />

            <H1>How it works</H1>
            <ol class="list-decimal pl-5 flex flex-col gap-2">
                <li>
                    Define a schema that describes your form’s data shape and
                    rules.
                </li>
                <li>Bind it to your UI renderer of choice.</li>
                <li>
                    Validate and transform data using the same schema on client
                    and server.
                </li>
            </ol>

            <div class="hidden">
                <CodeTabs
                    tabs={[
                        {
                            label: "JSON Schema",
                            content: <CodeBlock value={``} height={"280px"} />,
                            active: true,
                        },
                        {
                            label: "Typescript Builder",
                            content: <CodeBlock value={``} height={"100px"} />,
                        },
                    ]}
                />
            </div>

            <CodeBlock
                height={"380px"}
                value={`const form = K.form({
    $id: "my-form",
    name: K.string()
        .validations(v => v.required()),
    quantity: K.number()
        .default(7)
        .validations(v => v.min(5).max(20)),
    consent: K.boolean()
        .default(false)
        .validations(v => v.value(true)),
}`}
            />

            {/*<div class="p-8 bg-gray-100 rounded-xl shadow-xl">*/}
            {/*    <FormSchemaProvider*/}
            {/*        schema={K.schema({*/}
            {/*            firstName: K.string().component({*/}
            {/*                title: "Firstname",*/}
            {/*                grid: 6,*/}
            {/*            }),*/}
            {/*            lastName: K.string().component({*/}
            {/*                title: "LastName",*/}
            {/*                grid: 6,*/}
            {/*            }),*/}
            {/*            subscribe: K.listString()*/}
            {/*                .enum([*/}
            {/*                    {*/}
            {/*                        label: "Newsletter",*/}
            {/*                        value: "newsletter",*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        label: "Promotions",*/}
            {/*                        value: "promition",*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        label: "User notifications",*/}
            {/*                        value: "user.notifications",*/}
            {/*                    },*/}
            {/*                ])*/}
            {/*                .component({*/}
            {/*                    type: "checkboxGroup",*/}
            {/*                    title: "Subscribe to",*/}
            {/*                    direction: "row",*/}
            {/*                    grid: 6,*/}
            {/*                }),*/}
            {/*        })}*/}
            {/*        locale={"en"}>*/}
            {/*        <GridForm*/}
            {/*            showThemeSelector={false}*/}
            {/*            showLanguageSelector={true}*/}
            {/*            submit={() => console.log("submit")}*/}
            {/*        />*/}
            {/*    </FormSchemaProvider>*/}
            {/*</div>*/}
        </>
    );
}
