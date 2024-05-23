import { promises as fs } from 'fs'
import { GetStaticProps,InferGetStaticPropsType } from 'next'
import path from 'path'

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {posts.map((post:any,index:number) => (
        <li key={index}>
          <h3>{post.content.name}</h3>
          <p>{post.content.description}</p>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps:GetStaticProps = async(context)  => {
  const postsDirectory = path.join(process.cwd(), 'src/pages/posts')
  const filenames = await fs.readdir(postsDirectory)  // 返回数组
  console.log('postsDirectory: ', postsDirectory)
  console.log('filenames: ',filenames)

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename)
    const readContents = await fs.readFile(filePath, 'utf-8')
    const fileContents = JSON.parse(readContents)
    return {filename, content: fileContents}
  })

  return {
    props: {
      posts: await Promise.all(posts)
    },
  }
}

export default Blog