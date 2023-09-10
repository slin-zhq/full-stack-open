const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = `
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
		id: ID!
	}

  type Query {
    bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book

		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		
		createUser(
			username: String!
			favoriteGenre: String!
		): User

		login(
			username: String!
			password: String!
		): Token
	}
`

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
					const newAuthor = new Author({ name: args.author })
					foundAuthor = await newAuthor.save()
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
			return savedBook.populate('author')
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
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})