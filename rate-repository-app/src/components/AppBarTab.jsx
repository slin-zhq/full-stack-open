import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ tabName, urlPath }) => {
	return (
		<Link to={urlPath} style={{ padding: 16 }}>
			<Text fontWeight='bold' color='appBarTab'>{tabName}</Text>
		</Link>
	);
};

export default AppBarTab;