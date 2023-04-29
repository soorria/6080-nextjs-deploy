import Link from 'next/link'

function BlogPost({ post }) {
  return (
    <div className="p-8 space-y-12">
      <article className="space-y-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <Link href="/" className="block">
        Back to all posts
      </Link>
    </div>
  )
}

export default BlogPost

export async function getStaticProps({ params }) {
  console.log('running getstaticprops for blog post page')

  const API_URL = `https://jsonplaceholder.typicode.com/posts/${params.blogPostId}`
  const response = await fetch(API_URL)
  const json = await response.json()
  return {
    props: {
      post: json,
    },
  }
}

export async function getStaticPaths() {
  const API_URL = 'https://jsonplaceholder.typicode.com/posts'

  const response = await fetch(API_URL)
  const posts = await response.json()

  return {
    paths: posts.slice(0, 20).map(post => ({
      params: {
        blogPostId: post.id.toString(),
      },
    })),
    fallback: false,
  }
}
