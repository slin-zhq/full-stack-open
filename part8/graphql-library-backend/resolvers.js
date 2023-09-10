const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args, context) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author', { name: 1, born: 1 })
			}
			return Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
		},
		allAuthors: async () => {
			const authors = await Author.find({})
			return authors
		},
		me: (root, args, context) => {
			return context.currentUser
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			let foundAuthor = await Author.find({ name: args.author })
			foundAuthor = foundAuthor.length ? foundAuthor[0] : null
			let savedBook
			try {
				if (!foundAuthor) {
					const newAuthor = new Author({ name: args.author, bookCount: 1 })
					foundAuthor = await newAuthor.save()
				} else {
					await Author.findByIdAndUpdate(
						foundAuthor._id, 
						{ bookCount: foundAuthor.bookCount+1 },
						{ new: true }
					)
				}
				const book = new Book({ ...args, author: foundAuthor._id})
				savedBook = await book.save()
			} catch (error) {
				throw new GraphQLError(`Saving book failed because ${error.message}`, {
					extensions: {
						code: 'BAD_USER_INPUT',
						error
					}
				})
			}
			savedBook = savedBook.populate('author')

			pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
			return savedBook
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			// const updatedAuthor = 
			// 	await Author.findOneAndUpdate(
			// 		{ name: args.name },
			// 		{ born: args.setBornTo },
			// 		{ new: true, runValidators: true, context: 'query' }
			// 	)
			// if (!updatedAuthor) {
			// 	throw new GraphQLError('Author not found', {
			// 		extensions: {
			// 			code: 'BAD_USER_INPUT',
			// 			invalidArgs: args.name
			// 		}
			// 	})
			// }
			// return updatedAuthor

			const author = await Author.findOne({ name: args.name })
			if (!author) {
				throw new GraphQLError('Author not found', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name
					}
				})
			}
			author.born = args.setBornTo
			return author.save()
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			
			if ( !user || args.password !== process.env.JWT_SECRET ) {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' } 
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		}
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
		}
	}
}

module.exports = resolvers