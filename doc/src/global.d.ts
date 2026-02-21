declare global {
    interface DocComponentPage {
        path: string;
        title: string;
        menuTitle?: string;
        description: string;
        keywords?: string[];
        component: () => JSX.Element;
    }
}

export {};
