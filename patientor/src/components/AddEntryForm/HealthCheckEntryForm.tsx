import { MenuItem, Select, SelectChangeEvent, InputLabel } from "@mui/material";
// import { TextField } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface Props {
	healthCheckRating: string;
	setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckEntryForm = ({ healthCheckRating, setHealthCheckRating }: Props) => {
	const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === "string") {
			const value = event.target.value;
			setHealthCheckRating(value);
		}
	}

	return (
		// <TextField
		// 	label="Healthcheck rating"
		// 	fullWidth
		// 	value={healthCheckRating}
		// 	onChange={({ target }) => setHealthCheckRating(target.value)}
		// />
		<div>
			<InputLabel style={{ marginTop: 20 }}>Rating</InputLabel>
			<Select
				label="Healthcheck rating"
				fullWidth
				value={healthCheckRating}
				onChange={onHealthCheckRatingChange}
			>
				<MenuItem
					key={HealthCheckRating.Healthy}
					value={HealthCheckRating.Healthy.toString()}
				>
					{HealthCheckRating[0]}
				</MenuItem>
				<MenuItem
					key={HealthCheckRating.LowRisk}
					value={HealthCheckRating.LowRisk.toString()}
				>
					{HealthCheckRating[1]}
				</MenuItem>
				<MenuItem
					key={HealthCheckRating.HighRisk}
					value={HealthCheckRating.HighRisk.toString()}
				>
					{HealthCheckRating[2]}
				</MenuItem>
				<MenuItem
					key={HealthCheckRating.CriticalRisk}
					value={HealthCheckRating.CriticalRisk.toString()}
				>
					{HealthCheckRating[3]}
				</MenuItem>
			</Select>
		</div>
	);
};

export default HealthCheckEntryForm;