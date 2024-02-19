import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blog-form.component'
import userEvent from '@testing-library/user-event'

test(`when creating a new blog, the form calls the event handler
it received as props with the right details`, async () => {
  const blog = {
    title: 'Testing blog',
    author: 'Testing author',
    url: 'url',
    likes: '19834',
  }
  const addBlog = jest.fn().mockReturnValue(blog)
  const user = userEvent.setup()

  const container = render(<BlogForm createBlog={addBlog} />).container

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')
  const likesInput = container.querySelector('.likes')

  fireEvent.change(titleInput, { target: { value: blog.title } })
  fireEvent.change(authorInput, { target: { value: blog.author } })
  fireEvent.change(urlInput, { target: { value: blog.url } })
  fireEvent.change(likesInput, { target: { value: blog.likes } })

  const saveButton = screen.getByText('save')
  await user.click(saveButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toStrictEqual(blog)
  expect(addBlog.mock.results[0].value).toBe(blog)
})