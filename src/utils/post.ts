import { getCollection, type CollectionEntry } from "astro:content"

export const getAllPosts = async () : Promise<CollectionEntry<'post'>> => {
    return await getCollection('post');
}