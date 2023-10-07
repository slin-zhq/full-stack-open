import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
	container: theme.styles.formContainer,
	textInput: theme.styles.textInput,
	primaryButton: theme.styles.primaryButton,
});

const validationSchema = yup.object().shape({
	ownerName: yup
		.string()
		.required('Repository owner name is required'),
	repositoryName: yup
		.string()
		.required('Repository name is required'),
	rating: yup
		.number()
		.positive('Rating cannot be less than 0')
		.integer('Rating must be an integer')
		.max(100, 'Rating cannot be greater than 100')
		.required('Rating is required'),
	text: yup
		.string()
		.optional(),
});

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: '',
	text: '',
};

const CreateReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				name="ownerName"
				placeholder="Repository owner name"
				style={styles.textInput}
			/>
			<FormikTextInput
				name="repositoryName"
				placeholder="Repository name"
				style={styles.textInput}
			/>
			<FormikTextInput
				name="rating"
				placeholder="Rating between 0 and 100"
				style={styles.textInput}
			/>
			<FormikTextInput
				name="text"
				placeholder="Review text"
				multiline
				style={styles.textInput}
			/>
			<Pressable
				style={styles.primaryButton}
				onPress={onSubmit}
			>
				<Text color='appBarTab'>Create a review</Text>
			</Pressable>
		</View>
	)
};

const CreateReviewContainer = ({ onSubmit }) => {
	return (
		<Formik initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<CreateReviewForm onSubmit={handleSubmit}/>
			)}
		</Formik>
	);
}

const CreateReview = () => {
	const [createReview] = useCreateReview();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const parsedReview = validationSchema.cast(values);

		try {
			const { data } = await createReview(parsedReview);
			navigate(`/${data.createReview.repositoryId}`);
		} catch (e) {
			console.log(e);
		}
	}

	return <CreateReviewContainer onSubmit={onSubmit}/>;
}

export default CreateReview;