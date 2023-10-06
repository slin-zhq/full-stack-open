import { useQuery } from "@apollo/client"
import { GET_A_REPOSITORY } from "../components/graphql/queries";

const useRepository = (id) => {
	const { data, error, loading, refetch } = useQuery(GET_A_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: {
			repositoryId: id
		}
	});

	return { repo: data ? data.repository : null, loading, refetch };
}

export default useRepository;