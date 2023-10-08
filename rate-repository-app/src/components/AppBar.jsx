import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from "../hooks/useAuthStorage";
import Text from './Text';
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
	const { currentUser } = useCurrentUser();
	// const signedInUser = data ? data.getCurrentUser : null;
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	const SignOutButton = ({ signOut }) => (
		<Pressable
			style={{ padding: 16 }}
			onPress={signOut}
		>
			<Text fontWeight='bold' color='appBarTab'>Sign out</Text>
		</Pressable>
	);

  return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab urlPath="/" tabName="Repositories"/>
				{currentUser && <AppBarTab urlPath="/create-review" tabName="Create a review"/>}
				{currentUser && <AppBarTab urlPath="/my-reviews" tabName="My reviews"/>}
				{!currentUser && <AppBarTab urlPath="/sign-in" tabName="Sign in"/>}
				{!currentUser && <AppBarTab urlPath="/sign-up" tabName="Sign up" />}
				{currentUser && <SignOutButton signOut={signOut}/>}
			</ScrollView>
		</View>
	);
};

export default AppBar;