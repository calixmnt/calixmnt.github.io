import { type CollectionEntry, getCollection } from "astro:content";

export const getAllPosts = async (): Promise<CollectionEntry<"post">[]> => {
  const posts = await getCollection("post", ({ data }) => data.draft !== true);

  return posts.filter(
    (p): p is CollectionEntry<"post"> =>
      !!p &&
      !!p.data &&
      !!p.data.title &&
      !!p.data.publishDate
  );
};
