const blogPosts = [
    { slug: '1', title: 'Hello Next.js', content: '<p>This is the content of the first blog post.</p>' },
    { slug: '2', title: 'Dynamic Routes in Next.js', content: '<p>This is the content of the second blog post.</p>' },
]

export async function getAllBlogPosts() {
  return Promise.resolve(blogPosts)
}

export async function getBlogPostBySlug(slug: any) {
  const post = blogPosts.find(post => post.slug ===slug)  // 在博客文章数组中查找匹配的slug
  if(!post) {
    throw new Error(`No post found for slug: ${slug}`)
  }

  return Promise.resolve(post)
}