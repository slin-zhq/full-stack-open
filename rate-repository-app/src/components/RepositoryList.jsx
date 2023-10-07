import { FlatList, View, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
// import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
	orderPickerContainer: {
		marginVertical: 16, 
		marginHorizontal: 12,
	},
	segmentedButtons: {
		backgroundColor: 'white',
	}
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

export const RepositoryListContainer = ({ repositories, selectedPrinciple, setSelectedPrinciple }) => {

	const repositoryNodes = repositories
	? repositories.edges.map(edge => edge.node)
	: [];

	const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
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
			ListHeaderComponent={() => (
				<OrderPicker 
					selectedPrinciple={selectedPrinciple}
					setSelectedPrinciple={setSelectedPrinciple}	
				/>
			)}
    />
  );
};

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
	
	const { repositories } = useRepositories(getQueryVariables(selectedPrinciple));

	return <RepositoryListContainer 
		repositories={repositories} 
		selectedPrinciple={selectedPrinciple}
		setSelectedPrinciple={setSelectedPrinciple}
		/>;
};

export default RepositoryList;