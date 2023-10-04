import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		display:'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	textInput: {
		borderWidth: 1,
		borderColor: theme.colors.textInputBorder,
		marginTop: 16,
		padding: 12,
		borderRadius: 4,
	},
	primaryButton: {
		backgroundColor: theme.colors.primary,
		padding: 12,
		display:'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 4,
		marginTop: 16,
	}
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
			console.log(data);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return <SignInContainer 
		initialValues={initialValues}
		onSubmit={onSubmit}
		validationSchema={validationSchema}
		/>;
};

export default SignIn;