import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	container: theme.styles.formContainer,
	textInput: theme.styles.textInput,
	primaryButton: theme.styles.primaryButton,
});

export const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required'),
});

const initialValues = {
	username: '',
	password: '',
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput 
				name="username"
				placeholder="Username"
				style={styles.textInput}
			/>
			<FormikTextInput
				style={styles.textInput}
				name="password"
				placeholder="Password"
				secureTextEntry
			/>
			<Pressable
				style={styles.primaryButton}
				onPress={onSubmit}
			>
				<Text color='appBarTab'>Sign in</Text>
			</Pressable>
		</View>
	);
};

export const SignInContainer = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<SignInForm onSubmit={handleSubmit}/>
			)}
		</Formik>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			// console.log(data);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return <SignInContainer 
		onSubmit={onSubmit}
		/>;
};

export default SignIn;