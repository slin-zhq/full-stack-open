import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../components/graphql/queries"
import useSignIn from "./useSignIn";

const useSignUp = () => {
	const [createUser, result] = useMutation(CREATE_USER);
	const [signIn] = useSignIn();

	const signUp = async ({ username, password }) => {
		const { data } = await createUser({ variables: { user: { username, password } } });
		await signIn({ username, password });
		return { data };
	};

	return [signUp, result];
};

export default useSignUp;