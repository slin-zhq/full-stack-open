export interface DiaryEntry {
	id: number, 
	date: string,
	weather: string, 
	visibility: string,
	comment: string 
}

export type DiaryEntryForDisplay = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>