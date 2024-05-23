import { useRouter } from 'next/router';
import {GetStaticPaths} from 'next'
import { getAllBlogPosts, getBlogPostBySlug } from '../../lib/blogApi'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllBlogPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },  // only blog/1 and blog/2 are generated at build time
  }))
  return {
    paths,
    // enable statically generating additional pages, such as blog/3
    fallback: true
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  return {
    props: {post},
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1, 
  };
}

export default function BlogPost({post}:{post:any}) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  if(router.isFallback) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h3>{post.slug}</h3>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

