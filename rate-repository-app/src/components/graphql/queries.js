import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					ownerAvatarUrl,
					fullName,
					description,
					language,
					stargazersCount,
					forksCount,
					reviewCount,
					ratingAverage
				}
			}
		}
	}
`;

export const AUTHENTICATE_USER = gql`
	mutation authenticate($credentials: AuthenticateInput!) {
		authenticate(
			credentials: $credentials
			) {
				accessToken
			}
	}
`;

export const ME = gql`
	query {
		me {
			id
			username
		}
	}
`;