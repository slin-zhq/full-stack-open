import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../components/graphql/queries";

const useCreateReview = () => {
	const [createReview, result] = useMutation(CREATE_REVIEW);

	const reviewRepo = async ({ ownerName, rating, repositoryName, text }) => {
		const review = {
			ownerName,
			rating,
			repositoryName,
			text
		};
		const { data } = await createReview({ variables: { review }});
		return { data };
	}

	return [reviewRepo, result];
};

export default useCreateReview;