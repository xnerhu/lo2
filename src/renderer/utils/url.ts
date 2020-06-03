export const formatBlogUrl = (category: string) => (subcategory: string) => {
  return `/blog/${category}?subcategory=${subcategory}`;
};
