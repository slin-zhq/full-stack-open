import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('BlogForm component tests', () => {
  let createBlog
  const blog = {
    title: 'Batman',
    author: 'Bruce Wayne',
    url: 'https://batman.fandom.com/wiki/Batman',
  }

  beforeEach(() => {
    createBlog = jest.fn()
    render(<BlogForm createBlog={createBlog}/>)
  })

  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const user = userEvent.setup()
    const blogTitleInput = screen.getByTestId('blog-title')
    const blogAuthorInput = screen.getByTestId('blog-author')
    const blogUrlInput = screen.getByTestId('blog-url')
    const createButton = screen.getByText('create')

    await user.type(blogTitleInput, blog.title)
    await user.type(blogAuthorInput, blog.author)
    await user.type(blogUrlInput, blog.url)
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
  })

})