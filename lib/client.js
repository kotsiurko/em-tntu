import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "asnyakur",
  dataset: "production",
  apiVersion: "2023-04-02",
  token: process.env.MAIN_TOKEN,
  useCdn: false
});