// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../components/graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

	const { data, error, loading, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
		// fetchPolicy: 'cache-and-network',
		variables: {
			orderBy,
			orderDirection,
			searchKeyword
		}
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				orderBy,
				orderDirection,
				searchKeyword
			},
		});
	};

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.100.110:5001/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // return { repositories, loading, refetch: fetchRepositories };

	return { 
		repositories: data ? data.repositories : null, 
		fetchMore: handleFetchMore, 
		loading, 
		refetch 
	};
};

export default useRepositories;