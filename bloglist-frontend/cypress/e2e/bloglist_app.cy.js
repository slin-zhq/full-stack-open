describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Bruce Wayne',
      username: 'batman',
      password: 'i-am-batman',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('batman')
      cy.get('#password').type('i-am-batman')
      cy.get('#login-button').click()

      cy.contains('Bruce Wayne logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('batman')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'batman', password: 'i-am-batman' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('The Joker')
      cy.get('#author').type('Bruce Wayne')
      cy.get('#url').type('https://batman.fandom.com/wiki/The_Joker')
      cy.get('#create-button').click()

      cy.contains('The Joker')
      cy.get('#author')
    })

    it('A blog can be liked', function() {
      const newBlog = {
        title: 'The Joker',
        author: 'Bruce Wayne',
        url: 'https://batman.fandom.com/wiki/The_Joker',
        likes: 0,
      }
      cy.createBlog(newBlog)

      cy.get('#view-button').click()
      cy.get('#like-button').click()
    })

    it('A blog can be deleted by its creator', function() {
      const newBlog = {
        title: 'The Joker',
        author: 'Bruce Wayne',
        url: 'https://batman.fandom.com/wiki/The_Joker',
        likes: 0,
      }
      cy.createBlog(newBlog)

      // delete blog
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
    })

    it('Only the creator can see the delete button of a blog, not anyone else', function() {
      const newBlog = {
        title: 'The Joker',
        author: 'Bruce Wayne',
        url: 'https://batman.fandom.com/wiki/The_Joker',
        likes: 0,
      }
      cy.createBlog(newBlog)

      cy.get('#logout-button').click()

      const user = {
        name: 'Clark Kent',
        username: 'superman',
        password: 'kal-el',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

      cy.login({ username: 'superman', password: 'kal-el' })

      cy.get('#view-button').click()
      cy.get('#remove-button').should('not.exist')
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function() {
      const newBlogs = [
        {
          title: 'The Joker',
          author: 'Bruce Wayne',
          url: 'https://batman.fandom.com/wiki/The_Joker',
          likes: 13,
        },
        {
          title: 'Batman',
          author: 'Bruce Wayne',
          url: 'https://batman.fandom.com/wiki/Batman',
          likes: 42,
        },
        {
          title: 'Superman',
          author: 'Clark Kent',
          url: 'https://superman.fandom.com/wiki/Superman',
          likes: 23,
        },
      ]

      for (const newBlog of newBlogs) {
        cy.createBlog(newBlog)
      }

      cy.get('.blog').eq(0).should('contain', 'Batman')
      cy.get('.blog').eq(1).should('contain', 'Clark Kent')
      cy.get('.blog').eq(2).should('contain', 'The Joker')
    })
  })
})