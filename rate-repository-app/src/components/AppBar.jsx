import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from './graphql/queries';
import useAuthStorage from "../hooks/useAuthStorage";
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
	const { data } = useQuery(ME);
	const signedInUser = data ? data.me : null;
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
				{!signedInUser && <AppBarTab urlPath="/sign-in" tabName="Sign in"/>}
				{signedInUser && <SignOutButton signOut={signOut}/>}
			</ScrollView>
		</View>
	);
};

export default AppBar;