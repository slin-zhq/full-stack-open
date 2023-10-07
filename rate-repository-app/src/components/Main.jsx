import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
		backgroundColor: theme.colors.primaryBackground,
  },
});

const appTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		secondaryContainer: theme.colors.primary,
		onSecondaryContainer: theme.colors.textAppBarTab,
		primary: theme.colors.primary,
		onSurface: theme.colors.textSecondary,
		outline: theme.colors.textInputBorder,
	}
}

const Main = () => {
  return (
		<PaperProvider theme={appTheme}>
			<View style={styles.container}>
				{/* <Text>Rate Repository Application</Text> */}
				<AppBar />
				<Routes>
					<Route path="/" element={<RepositoryList />} />
					<Route path='/:id' element={<SingleRepository />} />
					<Route path='/create-review' element={<CreateReview />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</View>
		</PaperProvider>
  );
};

export default Main;