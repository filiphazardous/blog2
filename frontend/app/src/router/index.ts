import { getListFactory } from "@/api";
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

export async function getRoutes() {
  const { queryFn: getArticles } = getListFactory("articles");
  const articles = await getArticles();
  const articleRoutes = articles.map(
    ({ slug }: { slug: string }) => `/article/${slug}`
  );
  console.log(articleRoutes);
  return articleRoutes;
}

export default routes;
