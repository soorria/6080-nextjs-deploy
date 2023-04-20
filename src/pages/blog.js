import Link from 'next/link'

export default function Home({ posts }) {
  return (
    <main className="space-y-8 p-8">
      {posts.map(post => {
        return (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="p-4 block bg-slate-800 rounded hover:bg-slate-700"
          >
            {post.title}
          </Link>
        )
      })}
    </main>
  )
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getStaticProps() {
  const response = await fetch(API_URL)
  const json = await response.json()
  return {
    props: {
      posts: json,
    },
  }
}
