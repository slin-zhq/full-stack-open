import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import { useEffect } from "react"

const Recommendations = ({ show }) => {
	const resultMe = useQuery(ME, {
		skip: !show,
	})	

	const [ getBooks, { data: getBooksData} ] = useLazyQuery(ALL_BOOKS)

	useEffect(() => {
		if (resultMe.data) {
			getBooks({
				variables: { genre: resultMe.data.me.favoriteGenre}
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resultMe.data])

	if (show && getBooksData) {
		const books = getBooksData.allBooks

		return (
			<div>
				<h2>recommendations</h2>

				<div>books in your favorite genre "{resultMe.data.me.favoriteGenre}"</div>

				<table>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>
						{books.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Recommendations