import React, { FormEventHandler, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Word } from '../redux/words/words.types'
import WordCard from './WordCard'
import { addWord } from '../redux/words/wordsSlice'

const Words = () => {


	const reduxWords: Word[] = useAppSelector(state => state.words.words)
	const [words, setWords] = useState( reduxWords )

	useEffect(() => {
		setWords( reduxWords )
	}, [reduxWords])

	const dispatch = useAppDispatch()

	const random = (): number => {
		let rand = Math.floor(Math.random() * 1000000)

		while (words.some(word => word.id === rand)) {
			rand = Math.floor(Math.random() * 1000000)
		}

		return rand
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const formElements = form.elements as typeof form.elements & {
			germanWord: { value: string },
			spanishWord: { value: string }
		}

		const germanWord = formElements.germanWord.value
		const spanishWord = formElements.spanishWord.value

		formElements.germanWord.value = ""
		formElements.spanishWord.value = ""

		if (germanWord !== '' && spanishWord !== '') {
			dispatch(
				addWord(
					{
						id: random(),
						value: {
							german: germanWord,
							spanish: spanishWord
						},
						type: null
					}
				)
			)
		}
	}

	const handleSearch = ( event: any ) => {
		const searchInput = event.target.value
		const filteredWords = reduxWords.filter( word => ( word.value.german.startsWith( searchInput ) || word.value.spanish.startsWith( searchInput ) ) )
		setWords( filteredWords )
	}

	return (
		<div
			className='flex flex-col gap-2 overflow-hidden'
		>

			<div
				className='px-4 flex gap-4 flex-wrap justify-between'
			>
				<h1 className='text-5xl font-bold'>
					Worten
				</h1>
				<div
					className='flex items-center w-full sm:w-1/2'
				>
					<input
						tabIndex={1}
						type="text"
						name=""
						placeholder='Search'
						id=""
						onInput={ handleSearch }
						className='px-4 outline-none transition-all focus:ring-4 ring-slate-400 rounded-xl shadow-md h-10 w-full'
						/>
				</div>
			</div>

			<div className='h-[70vh] overflow-y-auto '>
				<div className='p-4  flex flex-col gap-2 overflow-y-auto'>
					{
						words.map((word, index) => <WordCard key={index} word={word} />)
					}
				</div>
			</div>

			<form
				method='POST'
				onSubmit={handleSubmit}
				className='p-4 m-4 focus-within:ring-4 ring-slate-400 flex justify-between rounded-xl overflow-hidden bg-white gap-4 shadow-[inset_0_5px_10px_rgba(0,0,0,0.3)]'
			>

				<div className='flex gap-4 flex-col sm:flex-row w-full'>

					<input
						type="text"
						name="germanWord"
						placeholder='Deutche'
						autoComplete='off'
						spellCheck='false'
						className='w-full outline-none bg-none pl-2 font-bold text-xl focus:ring-4 ring-slate-300 rounded-sm'
					/>

					<input
						type="text"
						name="spanishWord"
						placeholder='Spanisch'
						autoComplete='off'
						spellCheck='false'
						className='w-full outline-none bg-none pl-2 font-bold text-xl focus:ring-4 ring-slate-300 rounded-sm'
					/>

				</div>

				<button
					className='shadow-lg rounded-lg font-bold bg-slate-800 hover:bg-slate-900 active:translate-y-1 focus:ring-4 outline-none ring-slate-400 transition-all text-white px-4 py-2'
				>
					+
				</button>

			</form>

		</div>
	)
}

export default Words