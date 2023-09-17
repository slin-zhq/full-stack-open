import { useEffect, useState } from "react";
import DiaryEntryList from "./components/DiaryEntryList";
import { DiaryEntryForDisplay } from "./types";
import { createDiaryEntry, getAllDiaryEntries } from "./diaryEntryService";
import axios from "axios";

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntryForDisplay[]>([]);
	const [date, setDate] = useState('')
	const [visibility, setVisibility] = useState('')
	const [weather, setWeather] = useState('')
	const [comment, setComment] = useState('')
	const [errorMessage, setErrorMessge] = useState('')
	
	useEffect(() => {
		getAllDiaryEntries().then(data => {
			setDiaryEntries(data);
		});
	}, []);

	const handleCreate = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const addedDiaryEntry = await createDiaryEntry({
				date,
				visibility,
				weather,
				comment
			});
			setDiaryEntries(diaryEntries.concat(addedDiaryEntry));
			setDate('');
			setVisibility('');
			setWeather('');
			setComment('');
			setErrorMessge('');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setErrorMessge(error.response?.data);
			}
		}
	} 
	
	return (
		<div>
			<h1>Ilari&apos;s flight diaries</h1>
			<h2>Add new entry</h2>
			{errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
			<form onSubmit={handleCreate}>
				<div>
					date: 
					<input
						type="date"
						value={date}
						onChange={(event) => setDate(event.target.value)} 
					/>
				</div>
				<div>
					visibility: 
					{/* <input
						value={visibility}
						onChange={(event) => setVisibility(event.target.value)} 
					/> */}
					<input type="radio" name="visibility" value="great" onChange={(event) => setVisibility(event.target.value)} /> great
					<input type="radio" name="visibility" value="good" onChange={(event) => setVisibility(event.target.value)} /> good
					<input type="radio" name="visibility" value="ok" onChange={(event) => setVisibility(event.target.value)} /> ok
					<input type="radio" name="visibility" value="poor" onChange={(event) => setVisibility(event.target.value)} /> poor
				</div>
				<div>
					weather: 
					{/* <input
						value={weather}
						onChange={(event) => setWeather(event.target.value)} 
					/> */}
					<input type="radio" name="weather" value="sunny" onChange={(event) => setWeather(event.target.value)} /> sunny
					<input type="radio" name="weather" value="rainy" onChange={(event) => setWeather(event.target.value)} /> rainy
					<input type="radio" name="weather" value="cloudy" onChange={(event) => setWeather(event.target.value)} /> cloudy
					<input type="radio" name="weather" value="stormy" onChange={(event) => setWeather(event.target.value)} /> stormy
					<input type="radio" name="weather" value="windy" onChange={(event) => setWeather(event.target.value)} /> windy
				</div>
				<div>
					comment: 
					<input
						value={comment}
						onChange={(event) => setComment(event.target.value)} 
					/>
				</div>
				<button type="submit">add</button>
			</form>
			<DiaryEntryList diaryEntries={diaryEntries}/>
		</div>
	);
}

export default App;
