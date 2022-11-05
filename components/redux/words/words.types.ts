export const validWordTypes = ['regular', 'irregular', 'adjetive', 'noun', 'pronoun', null] as const

export type VerbType = 'regular' | 'irregular'
export type WordType = VerbType | 'adjetive' | 'noun' | 'pronoun' | null

export interface Word {
	id: number,
	value: {
		spanish: String,
		german: String
	},
	type: WordType
}

export interface WordArr {
	words: Array<Word>
}