import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
	const dispatch = useDispatch()

	return (
		<div>
			filter
			<input
				name="filter"
				onChange={(event) => dispatch(changeFilter(event.target.value))}
			/>
		</div>
	)
}

export default Filter