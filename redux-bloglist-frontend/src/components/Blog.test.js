import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog component tests', () => {
  let container
  let likeBlog

  beforeEach(() => {
    const blog = {
      title: 'Batman',
      author: 'Bruce Wayne',
      url: 'https://batman.fandom.com/wiki/Batman',
      likes: 42,
      creator: {
        name: 'Saw Lin',
        username: 'whoissaw'
      },
    }
    likeBlog = jest.fn()
    container = render(<Blog blog={blog} likeBlog={likeBlog}/>).container
  })

  test('renders title and author, but not URL or number of likes, by default', () => {
    const titleElement = screen.getByTestId('title')
    expect(titleElement).toBeDefined()

    const authorElement = screen.getByTestId('author')
    expect(authorElement).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('blog\'s url and number of likes are shown when  the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    for (let i = 0; i < 2; i++) {
      await user.click(likeButton)
    }

    expect(likeBlog.mock.calls).toHaveLength(2)

  })

})