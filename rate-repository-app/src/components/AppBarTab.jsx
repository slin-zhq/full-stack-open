import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ tabName }) => {
	return (
		<Pressable style={{ padding: 16 }}>
			<Text fontWeight='bold' color='appBarTab'>{tabName}</Text>
		</Pressable>
	);
};

export default AppBarTab;