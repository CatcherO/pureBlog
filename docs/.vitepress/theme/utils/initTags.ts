interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
    year: string 
    monthDay: string
  }
  tags: string[]
  excerpt: string | undefined
}
/**
* 标签数据结构类型
*/
export type TagsData = Record<string, Post[]>
/**
* 根据文章标签初始化标签数据
* @param posts 博客文章数组
* @returns 标签数据对象
*/
export function initTags(posts: Post[]): TagsData {
  if (!posts || posts.length === 0) return {};
  
  const data: TagsData = {};
  
  posts.forEach(post => {
      const tags = post.tags;
      if (tags) {
          tags.forEach(tag => {
              if (!data[tag]) {
                  data[tag] = [];
              }
              data[tag].push(post);
          });
      }
  });
  
  return data;
}