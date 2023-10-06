import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const reviewItemStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 12,
	},
	ratingContainer: {
		alignItems: 'center',
	},
	ratingCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderColor: theme.colors.primary,
		borderWidth: 2,
		alignItems: 'center', // rating text is the child of the `ratingCircle` flex container
		justifyContent: 'center',
	},
	reviewDetailsContainer: {
		flexDirection: 'column',
		flexGrow: 1,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginLeft: 16,
		flexShrink: 1,
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} isSingleRepoView={true}/>;
};

const ReviewItem = ({ review }) => {
  // Single review item
	return (
		<View style={reviewItemStyles.container}>
			<View style={reviewItemStyles.ratingContainer}>
				<View style={reviewItemStyles.ratingCircle}>
					<Text color='primary' fontWeight='bold' fontSize='subheading'>{review.rating}</Text>
				</View>
			</View>
			<View style={reviewItemStyles.reviewDetailsContainer}>
				<Text 
					fontWeight='bold'
					style={{
						marginBottom: 6,
					}}
				>
					{review.user.username}
				</Text>
				<Text 
					color='secondary'
					style={{
						marginBottom: 12,
					}}
				>
					{format(parseISO(review.createdAt), 'MMM d, yyyy')}
				</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const SingleRepository = () => {
	const { id } = useParams();
	const { repo } = useRepository(id);

	if (repo) {
		const reviews = repo.reviews.edges.map(({ node }) => node);
		return (
			<FlatList
				data={reviews}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={({ id }) => id}
				ListHeaderComponent={() => (
					<View>
						<RepositoryInfo repository={repo} />
						{ItemSeparator()}
					</View>
				)}
			/>
		);
	}
};

export default SingleRepository;