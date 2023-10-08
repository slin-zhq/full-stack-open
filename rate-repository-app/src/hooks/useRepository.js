import { useQuery } from "@apollo/client"
import { GET_A_REPOSITORY } from "../components/graphql/queries";

const useRepository = (variables) => {
	const { data, error, loading, fetchMore, refetch } = useQuery(GET_A_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables,
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables,
			}
		});
	};

	return { 
		repo: data ? data.repository : null, 
		fetchMore: handleFetchMore,
		loading, 
		refetch
	};
}

export default useRepository;