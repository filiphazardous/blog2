import { readFileSync, existsSync } from "fs";

export default (config, { strapi }) => {
  const content = readFileSync("./public/index.html");

  return (context, next) => {
    if (context.originalUrl === "/") {
      context.body = content;
      context.set("Content-Type", "text/html");
      return;
    }
    const testPath = `./public${context.originalUrl}.html`;
    if (existsSync(testPath)) {
      context.body = readFileSync(testPath);
      context.set("Content-Type", "text/html");
      return;
    }
    return next();
  };
};
