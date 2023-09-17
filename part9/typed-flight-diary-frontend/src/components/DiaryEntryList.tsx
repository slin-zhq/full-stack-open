import { DiaryEntryForDisplay } from "../types";

interface DiaryEntryListProps {
	diaryEntries: DiaryEntryForDisplay[];
}

const DiaryEntryList = (props: DiaryEntryListProps) => {
	return (
		<div>
			<h2>Diary entries</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Weather</th>
						<th>Visibility</th>
					</tr>
				</thead>
				<tbody>
					{props.diaryEntries.map((diaryEntry) => (
							<tr key={diaryEntry.id}>
								<td>{diaryEntry.date}</td>
								<td>{diaryEntry.weather}</td>
								<td>{diaryEntry.visibility}</td>
							</tr>
						) 
					)}
				</tbody>
			</table>
		</div>
	)
}

export default DiaryEntryList;