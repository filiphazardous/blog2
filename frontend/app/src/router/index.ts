import ArticleView from "@/views/ArticleView.vue";
import ListView from "@/views/ListView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ListView,
  },
  {
    path: "/article/:slug",
    name: "Article",
    component: ArticleView,
  },
];

export default routes;
