import { type CollectionEntry, getCollection } from "astro:content";

export const getAllPosts = async (): Promise<CollectionEntry<"post">[]> => {
  return await getCollection("post");
};
