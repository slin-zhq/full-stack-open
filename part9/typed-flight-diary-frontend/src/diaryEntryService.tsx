import axios from 'axios';
import { DiaryEntryForDisplay, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3003/api/diaries'

export const getAllDiaryEntries = () => {
	return axios
		.get<DiaryEntryForDisplay[]>(baseUrl)
		.then((response) => {
			return response.data;
		});
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
	return axios
		.post<DiaryEntryForDisplay>(baseUrl, object)
		.then((response) => response.data)
}