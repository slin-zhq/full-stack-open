import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					id,
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

export const GET_A_REPOSITORY = gql`
	query repostiory($repositoryId: ID!) {
		repository(id: $repositoryId) {
			ownerAvatarUrl,
			fullName,
			description,
			language,
			stargazersCount,
			forksCount,
			reviewCount,
			ratingAverage,
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`

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