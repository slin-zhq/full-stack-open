import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab urlPath="/" tabName="Repositories"/>
				<AppBarTab urlPath="/sign-in" tabName="Sign in"/>
			</ScrollView>
		</View>
	);
};

export default AppBar;