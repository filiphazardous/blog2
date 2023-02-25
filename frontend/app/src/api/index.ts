import type { Media } from "@strapi/strapi";
import axios from "axios";
import type {
  ApiArticleArticle as ApiArticle,
  ApiFooterFooter as ApiFooter,
  ApiHeaderHeader as ApiHeader,
} from "../../@types/schemas";

export const strapiBase = `http://localhost:${
  import.meta.env.VITE_STRAPI_PORT
}`;

type ImageSize = "original" | "thumbnail" | "small" | "medium" | "large";

function mapImage({
  attributes: { alternativeText, caption, formats, url },
}: Media) {
  return {
    alternativeText,
    caption,
    formats,
    url: `${strapiBase}${url}`,
  };
}

function mapArticle({
  attributes: { title, slug, summary, text, publishedAt, image: imageIn },
}: ApiArticle) {
  const image = (imageIn as any).data as Media[];
  return {
    title,
    slug,
    summary,
    text,
    publishedAt,
    image: image?.length ? image.map(mapImage) : [],
  };
}

function mapHeader({
  attributes: { siteName, subtitle, logo: logoIn },
}: ApiHeader) {
  const logo = (logoIn as any).data as Media;
  return { siteName, subtitle, logo: mapImage(logo) };
}

function mapFooter({ attributes: { copyright, contact } }: ApiFooter) {
  return { copyright, contact };
}

function contentType2MapFunc(contentType: string) {
  switch (contentType) {
    case "article":
    case "articles":
      return mapArticle;
    case "header":
    case "headers":
      return mapHeader;
    case "footer":
    case "footers":
      return mapFooter;
    default:
      throw new Error(`Unsupported contentType: "${contentType}"`);
  }
}

export function getListFactory(
  contentType: string,
  populate: string[] = [],
  sort: string = "publishedAt:desc"
) {
  async function getList() {
    const config = {
      headers: {
        Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
      },
      params: {
        sort,
        populate,
      },
    };

    const uri = `${strapiBase}/api/${contentType}`;
    return axios
      .get(uri, config)
      .then(({ data: { data } }) => data.map(mapArticle));
  }

  return {
    queryKey: [contentType],
    queryFn: getList,
  };
}

export function getItemFactory(
  contentType: string,
  populate: string[] = [],
  filter: { [key: string]: string } = {}
) {
  const filters = Object.keys(filter)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [`filters[${key}][$eq]`]: filter[key],
      }),
      {}
    );

  const mapItem = contentType2MapFunc(contentType);

  async function getItem() {
    const config = {
      headers: {
        Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
      },
      params: {
        populate,
        ...filters,
      },
    };
    const uri = `${strapiBase}/api/${contentType}`;
    return axios
      .get(uri, config)
      .then(({ data: { data } }) =>
        Array.isArray(data) ? mapItem(data[0]) : mapItem(data)
      );
  }

  return {
    queryKey: [JSON.stringify(filters), contentType],
    queryFn: getItem,
  };
}
