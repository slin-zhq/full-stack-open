import { FlatList, View, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
// import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { SegmentedButtons, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import React from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
	orderPickerContainer: {
		marginVertical: 16, 
		marginHorizontal: 12,
	},
	searchBarContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10, 
	},
	searchBarTheme: {
		colors: {
			elevation: {
				level3: 'white',
			},
		}
	},
});

const OrderingPrinciples = {
	LATEST: 'latest',
	HIGHEST_RATED: 'highest-rated',
	LOWEST_RATED: 'lowest-rated'
}

const ItemSeparator = () => <View style={styles.separator} />;

// const OrderPicker = ({ selectedPrinciple, setSelectedPrinciple }) => {
// 	return (
// 		<View style={styles.orderPickerContainer}>
// 			<Picker
// 				selectedValue={selectedPrinciple}
// 				onValueChange={(itemValue, itemIndex) => {
// 					setSelectedPrinciple(itemValue);
// 				}}
// 				style={{ height: 32 }}
// 			>
// 				<Picker.Item label='Latest repositories' value={OrderingPrinciples.LATEST}/>
// 				<Picker.Item label='Highest rated repositories' value={OrderingPrinciples.HIGHEST_RATED}/>
// 				<Picker.Item label='Lowest rated repositories' value={OrderingPrinciples.LOWEST_RATED}/>			
// 			</Picker>
// 		</View>
// 	);
// };

const OrderPicker = ({ selectedPrinciple, setSelectedPrinciple }) => {
	return (
    <SafeAreaView style={styles.orderPickerContainer}>
      <SegmentedButtons
				// style={{ flexWrap: 'wrap', }}
        value={selectedPrinciple}
        onValueChange={setSelectedPrinciple}
        buttons={[
          {
            value: OrderingPrinciples.LATEST,
            label: 'Latest',
          },
          {
            value: OrderingPrinciples.HIGHEST_RATED,
            label: 'Highest rated',
          },
          { 
						value: OrderingPrinciples.LOWEST_RATED, 
						label: 'Lowest rated',
					},
        ]}
      />
    </SafeAreaView>

	)
}

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
	const onChangeSearch = (query) => setSearchKeyword(query);

	return (
		<View style={styles.searchBarContainer}>
			<Searchbar
				placeholder='Search'
				onChangeText={onChangeSearch}
				value={searchKeyword}
				mode='view'
				elevation={1}
				theme={styles.searchBarTheme}
			/>
		</View>
	);
};

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const { 
			selectedPrinciple, 
			setSelectedPrinciple, 
			searchKeyword, 
			setSearchKeyword } = this.props;
		
		return (
			<>
				<SearchBar 
					searchKeyword={searchKeyword}
					setSearchKeyword={setSearchKeyword}
				/>
				<OrderPicker 
					selectedPrinciple={selectedPrinciple}
					setSelectedPrinciple={setSelectedPrinciple}	
				/>
			</>
		);
	};

	render() {
		const { repositories, navigate } = this.props;

		return (
			<FlatList
			 data={repositories}
			 ItemSeparatorComponent={ItemSeparator}
			 renderItem={({ item }) => (
				<Pressable
					onPress={() => { navigate(`/${item.id}`) }}
				>
					<RepositoryItem 
						repository={item}
					/>
				</Pressable>
			)}
			ListHeaderComponent={this.renderHeader}
			/>
		);
	};
};

// export const RepositoryListContainer 
// 	= ({ repositories, selectedPrinciple, setSelectedPrinciple, searchKeyword, setSearchKeyword }) => {

// 	const repositoryNodes = repositories
// 	? repositories.edges.map(edge => edge.node)
// 	: [];

// 	const navigate = useNavigate();

//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => (
// 				<Pressable
// 					onPress={() => { navigate(`/${item.id}`) }}
// 				>
// 					<RepositoryItem 
// 						repository={item}
// 					/>
// 				</Pressable>
// 			)}
// 			ListHeaderComponent={() => (
// 				<>
// 					<SearchBar 
// 						searchKeyword={searchKeyword}
// 						setSearchKeyword={setSearchKeyword}
// 					/>
// 					<OrderPicker 
// 						selectedPrinciple={selectedPrinciple}
// 						setSelectedPrinciple={setSelectedPrinciple}	
// 					/>
// 				</>

// 			)}
//     />
//   );
// };

const getQueryVariables = (selectedPrinciple) => {
	switch (selectedPrinciple) {
		case OrderingPrinciples.HIGHEST_RATED:
			return {
				orderBy: 'RATING_AVERAGE',
				orderDirection: 'DESC'
			};
		case OrderingPrinciples.LOWEST_RATED:
			return {
				orderBy: 'RATING_AVERAGE',
				orderDirection: 'ASC'
			};
		default:
			return {
				orderBy: 'CREATED_AT',
				orderDirection: 'DESC'
			};
	}
}

const RepositoryList = () => {
	const [selectedPrinciple, setSelectedPrinciple] = useState(OrderingPrinciples.LATEST);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

	const { repositories } 
		= useRepositories({ 
			...getQueryVariables(selectedPrinciple), 
			searchKeyword: debouncedSearchKeyword 
		});

	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	const navigate = useNavigate();

	return <RepositoryListContainer 
		repositories={repositoryNodes}
		navigate={navigate} 
		selectedPrinciple={selectedPrinciple}
		setSelectedPrinciple={setSelectedPrinciple}
		searchKeyword={searchKeyword}
		setSearchKeyword={setSearchKeyword}
		/>;
};

export default RepositoryList;