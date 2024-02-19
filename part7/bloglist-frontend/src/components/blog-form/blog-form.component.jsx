import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author,
      title,
      url,
      likes
    })

    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes(0)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          className='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          className='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          className='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        likes
        <input
          className='likes'
          type="number"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm