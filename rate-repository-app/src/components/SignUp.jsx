import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
	container: theme.styles.formContainer,
	textInput: theme.styles.textInput,
	primaryButton: theme.styles.primaryButton,
});

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(5, 'Username must be at least 5 characters long')
		.max(30, 'Username can be at most 30 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'Password must be at least 5 characters long')
		.max(30, 'Password can be at most 30 characters long')
		.required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), ''], 'Make sure your password and confirmation match.')
		.required('Password confirmation is required'),
});

const initialValues = {
	username: '',
	password: '',
	passwordConfirmation: ''
};

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				name="username"
				placeholder="Username"
				style={styles.textInput}
			/>
			<FormikTextInput
				name="password"
				placeholder="Password"
				style={styles.textInput}
				secureTextEntry
			/>
			<FormikTextInput
				name="passwordConfirmation"
				placeholder="Password confirmation"
				style={styles.textInput}
				secureTextEntry
			/>
			<Pressable
				style={styles.primaryButton}
				onPress={onSubmit}
			>
				<Text color='appBarTab'>Sign up</Text>
			</Pressable>
		</View>
	)
};

const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<SignUpForm onSubmit={handleSubmit} />
			)}
		</Formik>
	);
};

const SignUp = () => {
	const [signUp] = useSignUp();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password, passwordConfirmation } = values;
		
		try {
			await signUp({ username, password });
			navigate('/');
		} catch (e) {
			console.log(e);
		}
	}

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;