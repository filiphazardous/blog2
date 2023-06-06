import { readFileSync, existsSync } from "fs";

function getBasePath(url: string): string {
  const withoutGet = url.split("?")[0];
  const withHtml = withoutGet.match(/.*\.html$/)
    ? withoutGet
    : `${withoutGet}.html`;
  return withHtml;
}

export default (config, { strapi }) => {
  const content = readFileSync("./public/index.html");

  return (context, next) => {
    if (context.originalUrl === "/") {
      context.body = content;
      context.set("Content-Type", "text/html");
      return;
    }
    const basePath = getBasePath(context.originalUrl);
    const testPath = `./public${basePath}`;
    if (existsSync(testPath)) {
      context.body = readFileSync(testPath);
      context.set("Content-Type", "text/html");
      return;
    }
    return next();
  };
};
