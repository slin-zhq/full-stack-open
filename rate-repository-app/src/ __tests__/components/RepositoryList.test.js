import { RepositoryListContainer } from "../../components/RepositoryList";
import { formatCount } from "../../components/RepositoryItem";
import { render, screen, within } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

			render(<RepositoryListContainer repositories={repositories} />);
			// screen.debug();

			const repositoryItems = screen.getAllByTestId('repositoryItem');
			const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

			// ---------
			// checking first repository item
			const firstRepoItemData = repositories.edges[0].node;
			expect(firstRepositoryItem).toHaveTextContent(firstRepoItemData.fullName);
			expect(firstRepositoryItem).toHaveTextContent(firstRepoItemData.description);
			expect(firstRepositoryItem).toHaveTextContent(firstRepoItemData.language);
			expect(firstRepositoryItem).toHaveTextContent(formatCount(firstRepoItemData.forksCount));
			expect(firstRepositoryItem).toHaveTextContent(formatCount(firstRepoItemData.stargazersCount));
			expect(firstRepositoryItem).toHaveTextContent(firstRepoItemData.ratingAverage);
			expect(firstRepositoryItem).toHaveTextContent(formatCount(firstRepoItemData.reviewCount));

			// more detailed testing on the counts
			const firstRepoItemStarsCount = within(firstRepositoryItem).getByTestId('repositoryItem/stars');
			expect(firstRepoItemStarsCount).toBeDefined();
			expect(firstRepoItemStarsCount).toHaveTextContent(formatCount(firstRepoItemData.stargazersCount));
			
			const firstRepoItemForksCount = within(firstRepositoryItem).getByTestId('repositoryItem/forks');
			expect(firstRepoItemForksCount).toBeDefined();
			expect(firstRepoItemForksCount).toHaveTextContent(formatCount(firstRepoItemData.forksCount));

			const firstRepoItemReviewsCount = within(firstRepositoryItem).getByTestId('repositoryItem/reviews');
			expect(firstRepoItemReviewsCount).toBeDefined();
			expect(firstRepoItemReviewsCount).toHaveTextContent(formatCount(firstRepoItemData.reviewCount));

			const firstRepoItemRating = within(firstRepositoryItem).getByTestId('repositoryItem/rating');
			expect(firstRepoItemRating).toBeDefined();
			expect(firstRepoItemRating).toHaveTextContent(formatCount(firstRepoItemData.ratingAverage));
			// ---------

			// checking second repository item
			const secondRepoItemData = repositories.edges[1].node;
			expect(secondRepositoryItem).toHaveTextContent(secondRepoItemData.fullName);
			expect(secondRepositoryItem).toHaveTextContent(secondRepoItemData.description);
			expect(secondRepositoryItem).toHaveTextContent(secondRepoItemData.language);
			expect(secondRepositoryItem).toHaveTextContent(formatCount(secondRepoItemData.forksCount));
			expect(secondRepositoryItem).toHaveTextContent(formatCount(secondRepoItemData.stargazersCount));
			expect(secondRepositoryItem).toHaveTextContent(secondRepoItemData.ratingAverage);
			expect(secondRepositoryItem).toHaveTextContent(formatCount(secondRepoItemData.reviewCount));
    });
  });
});