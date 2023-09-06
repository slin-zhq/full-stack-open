import { useMutation, useQuery } from "@apollo/client"

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useEffect, useState } from "react"

const UpdateAuthor = ({ setError }) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [ { query: ALL_AUTHORS } ],
		onError: (error) => {
			console.log('error:', error)
		}
	})

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			setError('author not found')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.data])

	const submit = async (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

	return (
		<div>
			<h3>Set birthyear</h3>

			<form onSubmit={submit}>
			<div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
			</form>
		</div>
	)
}


const Authors = ({ show, setError }) => {
  // if (!props.show) {
  //   return null
  // }
  const result = useQuery(ALL_AUTHORS, {
		skip: !show,
	})
	
	if (show && result.data) {
		const authors = result.data.allAuthors

		return (
			<div>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>born</th>
							<th>books</th>
						</tr>
						{authors.map((a) => (
							<tr key={a.name}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
				<UpdateAuthor setError={setError}/>
			</div>
		)
	}
}

export default Authors
