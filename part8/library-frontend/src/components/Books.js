import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = ({ show }) => {
	const [selectedGenre, setSelectedGenre] = useState(null)

	const { refetch, data } = useQuery(ALL_BOOKS, {
		skip: !show
	})

	useEffect(() => {
		refetch({
			variables: { genre: selectedGenre }
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedGenre])

	if (show && data) {
		let books = data.allBooks

		const genreSet = new Set()
		books.forEach((book) => {
			book.genres.forEach((genre) => {
				genreSet.add(genre)
			})
		});

		const genres = Array.from(genreSet)

		if (selectedGenre) {
			books = books.filter(book => book.genres.includes(selectedGenre))
		}

		return (
			<div>
				<h2>books</h2>
	
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

				<div>
					{genres.map((genre, index) => (
						<button key={index} onClick={() => setSelectedGenre(genre)}>{genre}</button>
					))}
					<button onClick={() => setSelectedGenre(null)}>all genres</button>
				</div>
			</div>
		)
	}
}

export default Books
