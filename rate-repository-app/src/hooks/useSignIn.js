import { useApolloClient, useMutation } from "@apollo/client";

import { AUTHENTICATE_USER } from "../components/graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
	const [authenticate, result] = useMutation(AUTHENTICATE_USER);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const { data } = await authenticate({ variables: { credentials: { username, password } }});
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
		return { data };
	};

	return [signIn, result];
};

export default useSignIn;