import { H1, Spacer } from "@/components/html";

export const Template: DocComponentPage = {
    path: "/template",
    title: "Template example",
    menuTitle: "Template",
    description: "",
    keywords: [],
    component: RouteComponent,
};

function RouteComponent() {
    return (
        <>
            <H1>Title</H1>
            <p>content</p>
            <Spacer />
        </>
    );
}
