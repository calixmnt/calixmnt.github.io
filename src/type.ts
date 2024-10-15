export type Post = {
  title: string;
  description: string;
  publishDate: Date;
  tags: string[];
};

export type TPost = {
  data: Post;
  slug: string;
};
