import {
  dehydrate,
  hydrate,
  QueryClient,
  VueQueryPlugin,
} from "@tanstack/vue-query";
import { ViteSSG } from "vite-ssg";

import "./assets/main.css";
import App from "./App.vue";
import routes, { getRoutes } from "./router";

export const createApp = ViteSSG(
  App,
  { routes },
  async ({ app, initialState }) => {
    const queryClient = new QueryClient();
    if (import.meta.env.SSR) {
      initialState.vueQueryState = { toJSON: () => dehydrate(queryClient) };
    } else {
      hydrate(queryClient, initialState.vueQueryState);
    }

    app.use(VueQueryPlugin, { queryClient });
  }
);

export async function includedRoutes(paths: any, routes: any[]) {
  const articleRoutes = await getRoutes();
  return routes.flatMap((route) => {
    return route.name === "Article" ? articleRoutes : route.path;
  });
}
