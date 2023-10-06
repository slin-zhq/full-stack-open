import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
		backgroundColor: theme.colors.primaryBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Rate Repository Application</Text> */}
			<AppBar />
			<Routes>
        <Route path="/" element={<RepositoryList />} />
				<Route path='/:id' element={<SingleRepository />} />
				<Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;