import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import sitemap from "../pages/sitemap.json";
import { h } from "vue";
import { type Route } from "../types/types"
import Page from "../components/pages.vue"

let routes: RouteRecordRaw[] = [
    { 
        path: '/:pathMatch(.*)',
        component: h("div", "Oups ! Cette page n'existe pas")
    },
    {
        path: "/", redirect: '/aboutus'
    },
];

function getRoutes(root: Route[], path?: string): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const basePath = path ? path + "/" : "/";
  root.forEach((route) => {
    if (route.children) {
      const innerRoutes = getRoutes(route.children, basePath + route.path);
      routes.push(...innerRoutes);
    } else
      routes.push({
        path: basePath + route.path,
        component: Page,
      });
  });
  return routes;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...getRoutes(sitemap.$r)],
});

router.beforeEach((to, _, next) => {
    const { fullPath } = to;
    const splittedPath = fullPath.split("/");
    splittedPath.shift();
    const page = splittedPath.pop();
    const root = splittedPath.pop() ?? "$r";
    const route = sitemap.$r.find((r) => {
    if (r.children) {
        return r.children.find((c) => c.path === page);
    } else return r.path === page;
    });
    const subpageRoute = route?.children?.find((c) => c.path === page);
    const title = subpageRoute?.title ?? route?.title ?? "404";
    to.meta = {
        root,
        page,
        title
    };
    next();
});

export default router;