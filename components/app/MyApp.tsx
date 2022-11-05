import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Word } from '../redux/words/words.types'
import { getWordsDB, saveWordsDB, setWords } from '../redux/words/wordsSlice'
import Words from '../word/Words'


const MyApp = () => {

	const [currentKey, setCurrentKey] = useState('')
	const [prevKey, setPrevKey] = useState('')

	const words: Word[] = useAppSelector(state => state.words.words)
	const dispatch = useAppDispatch()

	const handleKeyPress = useCallback((event: any) => {
		setCurrentKey(event.key)
	}, [])

	const pasteBLetter = () => {
		navigator.clipboard.writeText('ß')
	}

	useEffect(() => {
		if (
			(prevKey === 'Control' && currentKey === 'b') ||
			(prevKey === 'Control' && currentKey === 'B')
		) {
			pasteBLetter()
		}

		setPrevKey(currentKey)
	}, [currentKey])

	useEffect(() => {

		if (words.length > 0) saveWordsDB(words)

	}, [words])

	useEffect(() => {
		dispatch(setWords(getWordsDB()))
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress)
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])

	return (
		<main className='xl:px-[20%] sm:px-[5%] transition-[width] py-4 h-screen bg-slate-100'>

			<Words />

		</main>
	)
}

export default MyApp