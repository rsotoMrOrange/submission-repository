import { useState } from 'react'
import PropType from 'prop-types'
import './blog.styles.css'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [isVisible, setIsVisible] = useState(false)

  const removeBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id)
    }
  }

  const isLoggedUserOwner = () => {
    const username = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))?.username
    return username === blog?.user?.username
  }

  const additionalInfo = () => {
    if (isVisible) {
      return (
        <>
          <ul>
            <li><a href={blog.url}>{blog.url}</a></li>
            <li>{blog.likes} <button onClick={updateBlog}>like</button></li>
            {blog.user && <li>{blog.user.name}</li>}
          </ul>
          {isLoggedUserOwner() && <button onClick={removeBlog}>remove</button>}
        </>
      )
    }
  }

  return (
    <div className='blogStyle'>
      <p> {blog.title} - {blog.author} <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button></p>
      {additionalInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropType.object.isRequired,
  updateBlog: PropType.func.isRequired,
  deleteBlog: PropType.func.isRequired
}

export default Blog