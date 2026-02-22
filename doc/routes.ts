import {
    rootRoute,
    route,
    type VirtualRouteNode,
} from "@tanstack/virtual-file-routes";
import type { TableOfContents, TableOfContentsItem } from "@/types";

export const routes = rootRoute("__root.tsx", [
    // index("index.tsx"),
    // ...tocToRoute(tableOfContents),
    route("/schema/basics", "doc/schema-basics.tsx"),
    route("/schema/properties", "doc/schema/properties.tsx"),
    route("/schema/selectors", "doc/schema/selectors.tsx"),
    // route("/schema/types", "doc/concept/types.tsx"),
    // route("/schema/object-type", "doc/concept/object-type.tsx"),
    // // physical("/overview", "doc/overview.tsx"),
    // route("/overview", "doc/overview.tsx", []),
    // physical("/posts", "posts"),
]);

// export const routes = rootRoute("__root.tsx", tocToRoute(tableOfContents));

(() => {
    // tocToRoute(tableOfContents);
})();

export function tocToRoute(
    tableOfContents: TableOfContents,
): VirtualRouteNode[] {
    tableOfContents;
    // const routes: VirtualRouteNode[] = [];
    // const items = tableOfContentToRoute(tableOfContents);
    // for (const item of items) {
    //     console.log(item);
    //     routes.push(route(item.href, `doc/${item.href}.tsx`));
    // }
    // return routes;
    return [];
}

export function tableOfContentToRoute(tableOfContents: TableOfContents): any[] {
    return tableOfContents.flatMap((item: TableOfContentsItem) => {
        if ("children" in item) {
            return tableOfContentToRoute(item.children);
        } else {
            return item;
        }
    });
}
