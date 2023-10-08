import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query repositories($orderBy: AllRepositoriesOrderBy, 
		$orderDirection: OrderDirection,
		$searchKeyword: String) {
		repositories(
			orderBy: $orderBy,
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
		) {
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

export const GET_CURRENT_USER = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						repository {
							fullName
						}
						createdAt
						rating
						text
						repositoryId
					}
				}
			}
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation createReview($review: CreateReviewInput) {
		createReview(
			review: $review
		) {
			repositoryId
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($user: CreateUserInput) {
		createUser(user: $user) {
			id
			username
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation deleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;