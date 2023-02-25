import axios from 'axios';

const strapiBase = `http://localhost:${import.meta.env.VITE_STRAPI_PORT}`;

type ImageSize = 'original' | 'thumbnail' | 'small' | 'medium' | 'large';

export function getListFactory(contentType: string, populate: string[] = [], imageSize: ImageSize = 'original', sort: string = 'publishedAt:desc') {
  function mapImage({id, attributes: {alternativeText, caption, formats, url}}) {
    const imageUrl = imageSize === 'original' ?
      url :
      formats[imageSize].url;
    return {
      id, alternativeText, caption, formats, url: `${strapiBase}${imageUrl}`,
    };
  }

  function mapArticle({id, attributes: {title, slug, summary, text, publishedAt, image}}) {
    return {
      id, title, slug, summary, text, publishedAt, image: populate.length ? image.data.map(mapImage) : [],
    };
  }

  async function getList() {
    const config = {
      headers: {
        Authorization: `bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
      },
      params: {
        sort,
        populate
      },
    };

    const uri = `${strapiBase}/api/${contentType}`;
    return axios.get(uri, config).then(({data: {data}}) => data.map(mapArticle));
  }

  return {
    queryKey: [contentType],
    queryFn: getList,
  }
}
