import type { ComputedRef } from "vue";

interface MakeHeadArgs {
  title: string | ComputedRef<string>;
  description: string | ComputedRef<string>;
  imageUrl: string | ComputedRef<string>;
  siteName?: string | ComputedRef<string>;
}

export function makeHead({
  title,
  description,
  imageUrl,
  siteName = title,
}: MakeHeadArgs) {
  return {
    title,
    meta: [
      {
        property: "og:title",
        content: title,
      },
      {
        name: "twitter:title",
        content: title,
      },
      // Description meta
      {
        name: "description",
        content: description,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        name: "twitter:description",
        content: description,
      },
      // Image meta
      {
        property: "og:image",
        content: imageUrl,
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
      // OG other
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:sitename",
        content: siteName,
      },
      {
        property: "og:url",
        content: "/",
      },
      // Twitter other
      {
        name: "twitter:card",
        content: "summary_lage_image",
      },
    ],
  };
}
