import { TextField } from "@mui/material";

interface Props {
	healthCheckRating: string;
	setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckEntryForm = ({ healthCheckRating, setHealthCheckRating }: Props) => {
	return (
		<TextField
			label="Healthcheck rating"
			fullWidth
			value={healthCheckRating}
			onChange={({ target }) => setHealthCheckRating(target.value)}
		/>
	);
};

export default HealthCheckEntryForm;