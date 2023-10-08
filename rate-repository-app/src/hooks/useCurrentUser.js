import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "../components/graphql/queries"

const useCurrentUser = (includeReviews = false) => {
	const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
		variables: {
			includeReviews
		}
	});

	return { currentUser: data ? data.me : null, loading, refetch};
}

export default useCurrentUser;