import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns';
import useCurrentUser from '../hooks/useCurrentUser';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from './graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const reviewItemStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 12,
	},
	subContainer: {
		flexDirection: 'row',
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
	},
	primaryButton: {
		...theme.styles.primaryButton,
		flexGrow: 1,
		marginRight: 12 
	},
	deleteButton: {
		...theme.styles.primaryButton,
		backgroundColor: '#E53935',
		flexGrow: 1
	},
	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, confirmDeleteReview }) => {
  // Single review item
	return (
		<View style={reviewItemStyles.container}>
			<View style={reviewItemStyles.subContainer}>
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
						{review.repository.fullName}
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
			<View style={reviewItemStyles.actionContainer}>
				<Pressable 
					style={reviewItemStyles.primaryButton}
					onPress={() => navigate(`/${review.repositoryId}`)}	
				>
					<Text color='appBarTab'>View repository</Text>
				</Pressable>
				<Pressable 
					style={reviewItemStyles.deleteButton}
					onPress={() => confirmDeleteReview(review.id)}
				>
					<Text color='appBarTab'>Delete review</Text>
				</Pressable>
			</View>
		</View>

	);
};

const MyReviews = () => {
	const { currentUser, refetch } = useCurrentUser(true);
	const navigate = useNavigate();

	const [deleteReview, result] = useMutation(DELETE_REVIEW);

	const confirmDeleteReview = (reviewId) => {
		console.log('reviewId:', reviewId);
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				onPress: async () => {
					try {
						console.log('deleting review...');
						await deleteReview({ variables: { deleteReviewId: reviewId } });
						await refetch({ includeReviews: true });
					} catch (e) {
						console.log(e);
					}
				},
			}
		]);
	};

	if (currentUser) {
		const reviews = currentUser.reviews.edges.map(edge => edge.node);

		return (
			<FlatList
				data={reviews}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} confirmDeleteReview={confirmDeleteReview}/>}
				keyExtractor={({ id }) => id}
			/>
		);
	}
}

export default MyReviews;