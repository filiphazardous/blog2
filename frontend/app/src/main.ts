import {
  dehydrate,
  hydrate,
  QueryClient,
  VueQueryPlugin,
} from "@tanstack/vue-query";
import { ViteSSG } from "vite-ssg";

import App from "./App.vue";

import "./assets/main.css";
import routes from "./router";

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    console.log("app", app);
    console.log("router", router);
    console.log("routes", routes);
    console.log("isClient", isClient);
    console.log("initialState", initialState);

    const queryClient = new QueryClient();
    if (import.meta.env.SSR) {
      initialState.vueQueryState = { toJSON: () => dehydrate(queryClient) };
    } else {
      hydrate(queryClient, initialState.vueQueryState);
    }

    app.use(VueQueryPlugin, { queryClient });
  }
);
