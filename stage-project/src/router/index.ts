import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import sitemap from "../pages/sitemap.json";
import { h } from "vue";
import { type Route } from "../types/types"
import Page from "../components/pages.vue"

let routes: RouteRecordRaw[] = [
    { 
        path: '/:pathMatch(.*)*',
        component: h("div", "Oups ! Cette page n'existe pas")
    },
    {
        path: "/", 
        redirect: '/aboutus'
    },
];

function getRoutes(root: Route[], parentPath: string = ""): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  
  root.forEach((route) => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
    
    if (route.children) {
      // For routes with children, create routes for the children
      const childRoutes = getRoutes(route.children, fullPath);
      routes.push(...childRoutes);
    } else {
      // For leaf routes, create the actual route
      routes.push({
        path: fullPath,
        component: Page,
      });
    }
  });
  
  return routes;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...getRoutes(sitemap.$r)],
});

router.beforeEach((to, _, next) => {
    const { fullPath } = to;
    const pathSegments = fullPath.split("/").filter(Boolean); // Remove empty strings
    
    // Determine root and page based on path depth
    let root: string;
    let page: string;
    
    if (pathSegments.length === 1) {
        // Root-level route like /aboutus
        root = "$r";
        page = pathSegments[0];
    } else if (pathSegments.length === 2) {
        // Nested route like /sensibilisation/ateliers
        root = pathSegments[0];
        page = pathSegments[1];
    } else {
        // Fallback for unexpected paths
        root = "$r";
        page = pathSegments[pathSegments.length - 1] || "";
    }
    
    // Find the route definition in sitemap
    let title = "404";
    
    if (root === "$r") {
        // Look for root-level route
        const route = sitemap.$r.find((r) => r.path === page);
        title = route?.title ?? "404";
    } else {
        // Look for nested route
        const parentRoute = sitemap.$r.find((r) => r.path === root);
        if (parentRoute?.children) {
            const childRoute = parentRoute.children.find((c) => c.path === page);
            title = childRoute?.title ?? "404";
        }
    }
    
    to.meta = {
        root,
        page,
        title
    };
    
    next();
});

export default router;