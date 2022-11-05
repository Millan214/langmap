import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Word, WordArr, WordType } from './words.types'

export const saveWordsDB = (words: Array<Word>): void => {

	if (typeof window !== 'undefined') {
		localStorage.setItem('words', JSON.stringify(words))
	}

}

export const getWordsDB = (): Array<Word> => {

	if (typeof window !== 'undefined') {
		const items = localStorage.getItem('words')
		if (items) {
			return JSON.parse(items)
		}
	}

	return []

}

const initialState: WordArr = {
	words: []
}

export const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		addWord: (state, action: PayloadAction<Word>) => {
			state.words = [...state.words, action.payload]
		},
		removeWord: (state, action: PayloadAction<number>) => {
			state.words = state.words.filter(word => {
				return action.payload !== word.id
			})
		},
		updateWordType: (state, action: PayloadAction<{id: number, wordType: WordType}>) => {
			state.words.forEach( word => {
				if( word.id === action.payload.id ) {
					word.type = action.payload.wordType
				}
			})
		},
		setWords: (state, action: PayloadAction<Array<Word>>) => {
			state.words = action.payload
		}
	}
})

export const { addWord, removeWord, setWords, updateWordType } = wordsSlice.actions

export default wordsSlice.reducer