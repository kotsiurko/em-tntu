// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { createClient } from "next-sanity";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import imageUrlBuilder from '@sanity/image-url'

export const clientConfig = {
  projectId: "asnyakur",
  dataset: 'production',
}

export const client = createClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: "2023-04-02",
  token: process.env.MAIN_TOKEN,
  // useCdn: false
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);