import { View, StyleSheet, Image, Pressable } from "react-native";
import * as Linking from 'expo-linking';
import Text from "./Text";

import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white',
		marginBottom: 0.25,
		padding: 12,
	},
	subContainerA: {
		display: 'flex',
		flexDirection: 'row',
		flexGrow: 1,
	},
	subContainerAA: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginLeft: 16,
		flexShrink: 1,
	},
	subContainerB: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 12
	},
	subContainerBB: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	avatarImage: {
		width: 50,
		height: 50,
		borderRadius: 4,
	},
	primaryButton: theme.styles.primaryButton,
});

export const formatCount = (count) => {
	return count >= 1000 ? `${(count/1000).toFixed(1)}k` : count.toString();
}

const RepositoryItem = ({ repository, isSingleRepoView }) => {
	if (repository) {
		return (
			<View testID="repositoryItem" style={styles.container}>
				<View style={styles.subContainerA}>
					<Image
						style={styles.avatarImage}
						source={{
							uri: repository.ownerAvatarUrl,
						}}
					/>
					<View style={styles.subContainerAA}>
						<Text fontWeight='bold'>{repository.fullName}</Text>
						<Text
							color='secondary'
							style={{ marginTop: 6, marginBottom: 6 }}
						>
							{repository.description}
						</Text>
						<View
							style={{
								backgroundColor: theme.colors.primary,
								padding: 6,
								borderRadius: 4,
							}} 
						>
							<Text color='appBarTab'>
								{repository.language}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.subContainerB}>
					<View testID="repositoryItem/stars" style={styles.subContainerBB}>
						<Text fontWeight='bold' style={{ marginBottom: 4 }}>{formatCount(repository.stargazersCount)}</Text>
						<Text color='secondary'>Stars</Text>
					</View>
					<View testID="repositoryItem/forks" style={styles.subContainerBB}>
						<Text fontWeight='bold' style={{ marginBottom: 4 }}>{formatCount(repository.forksCount)}</Text>
						<Text color='secondary'>Forks</Text>
					</View>
					<View testID="repositoryItem/reviews" style={styles.subContainerBB}>
						<Text fontWeight='bold' style={{ marginBottom: 4 }}>{formatCount(repository.reviewCount)}</Text>
						<Text color='secondary'>Reviews</Text>
					</View>
					<View testID="repositoryItem/rating" style={styles.subContainerBB}>
						<Text fontWeight='bold' style={{ marginBottom: 4 }}>{repository.ratingAverage}</Text>
						<Text color='secondary'>Rating</Text>
					</View>
				</View>
				{isSingleRepoView && 
					<Pressable
						style={styles.primaryButton}
						onPress={() => { Linking.openURL(repository.url) }}
					>
							<Text color='appBarTab'>Open in GitHub</Text>
					</Pressable>
				}
			</View>
		);
	}
};

export default RepositoryItem;