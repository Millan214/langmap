import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { validWordTypes, Word, WordType } from '../redux/words/words.types'
import { removeWord, updateWordType } from '../redux/words/wordsSlice'
import Spanish_Flag from "../../public/assets/svg/Spain_Flag.svg"
import Germany_Flag from "../../public/assets/svg/Germany_Flag.svg"
import Image from 'next/image'
import { motion } from 'framer-motion'
import CloseIcon from '../../public/assets/icons/CloseIcon'
import EditIcon from '../../public/assets/icons/EditIcon'
import ArrowDown from '../../public/assets/icons/ArrowDown'

type Props = {
	word: Word
}

const WordCard = (props: Props): JSX.Element => {

	const [open, setOpen] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [itemInFocus, setItemInFocus] = useState(false)

	useEffect(() => {

		if (editMode) {
			setOpen(true)
		}

	}, [editMode])

	useEffect(() => {

		if (!open) {
			setEditMode(false)
		}

	}, [open])

	const dispatch = useAppDispatch()

	const handleRemoveWord = () => {
		dispatch(removeWord(props.word.id))
	}

	const toggleOpen = () => {
		setOpen(open => open = !open)
	}

	const handleItemKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
		const code = evt.code
		if ((code === 'Enter' || code === 'Space') && !itemInFocus) {
			toggleOpen()
		}
	}

	const updateWord = (formEvent: React.FormEvent<HTMLFormElement>) => {
		formEvent.preventDefault()

		const form = formEvent.currentTarget
		const formElements = form.elements as typeof form.elements & {
			wordType: { value: string }
		}

		const input = formElements.wordType.value

		let wordType: any = input

		if (wordType === '') wordType = null

		const wordt: WordType = wordType

		dispatch(updateWordType({ id: props.word.id, wordType: wordt }))

	}

	const editWord = () => {
		setEditMode(edit => edit = !edit)
	}

	const showBody = () => {

		if (editMode) return (
			<motion.form
				className='mt-4 h-[80%]'
				onSubmit={updateWord}
			>
				<h1>Type</h1>
				<select
					name="wordType"
					
					onFocus={() => { setItemInFocus(true) }}
					onBlur={() => { setItemInFocus(false) }}
				>
					{
						validWordTypes.map((wordType, i) => <option key={i} value={`${wordType}`}>{wordType}</option>)
					}
				</select>
				<button
					
					aria-label='apply changes'
				>
					apply changes
				</button>
			</motion.form>
		)

		return (
			<motion.div className='mt-4 h-[80%]'>
				datos
			</motion.div>
		)
	}

	const showWordType = (wordType: any) => {

		switch (wordType) {
			case 'irregular':
				return (
					<>

						<motion.div className='text-xl shadow-md px-4 rounded-md bg-neutral-600 border-2 border-neutral-200 text-neutral-200 border-dashed'>
							irregular
						</motion.div>

						<motion.div className='text-xl shadow-md px-4 rounded-md bg-blue-200 border-2 border-blue-800 text-blue-800'>
							verb
						</motion.div>

					</>
				)

			case 'regular':
				return (
					<>

						<motion.div className='text-xl shadow-md px-4 rounded-md bg-neutral-200 border-2 border-neutral-800 text-neutral-800 border-dashed'>
							regular
						</motion.div>

						<motion.div className='text-xl shadow-md px-4 rounded-md bg-blue-200 border-2 border-blue-800 text-blue-800'>
							verb
						</motion.div>

					</>
				)

			case 'adjetive':
				return (
					<motion.div className='text-xl shadow-md px-4 rounded-md bg-pink-200 border-2 border-pink-800 text-pink-800'>
						adjetive
					</motion.div>
				)

			case 'noun':
				return (
					<motion.div className='text-xl shadow-md px-4 rounded-md bg-amber-200 border-2 border-amber-800 text-amber-800'>
						noun
					</motion.div>
				)

			case 'pronoun':
				return (
					<motion.div className='text-xl shadow-md px-4 rounded-md bg-teal-200 border-2 border-teal-800 text-teal-800'>
						pronoun
					</motion.div>
				)

			case (null):
				return (
					<motion.button
						className='transition-all focus:ring-4 ring-blue-900 outline-none flex content-center items-center gap-4 text-xl shadow-md px-4 rounded-md bg-blue-200 border-2 border-blue-800'
						
						onClick={() => { editWord() }}
						onFocus={() => setItemInFocus(true)}
						onBlur={() => setItemInFocus(false)}
					>
						<motion.div
							className='text-blue-800 text-xl pl-2'
						>
							Edit
						</motion.div>

						<EditIcon width={20} height={20} stroke="black" fill="black" />

					</motion.button>
				)

			default: return (
				<motion.button
					className='transition-all focus:ring-4 ring-blue-900 outline-none flex content-center items-center gap-4 text-xl shadow-md px-4 rounded-md bg-blue-200 border-2 border-blue-800'
					
					onClick={() => { editWord() }}
					onFocus={() => setItemInFocus(true)}
					onBlur={() => setItemInFocus(false)}
				>
					<motion.div
						className='text-blue-800 text-xl pl-2'
					>
						Edit
					</motion.div>

					<EditIcon width={20} height={20} stroke="black" fill="black" />

				</motion.button>
			)
		}

	}

	return (
		<motion.div
			tabIndex={0}
			aria-label='word'
			aria-labelledby='card'
			className='overflow-hidden relative cursor-pointer select-none transition-all outline-none focus:ring-4 ring-slate-400 bg-slate-200 px-4 py-3 my-4 rounded-lg shadow-md flex flex-col align-middle justify-between'
			onKeyDown={(event) => handleItemKeyDown(event)}
			animate={open ? 'open' : 'closed'}
		>
			<motion.div className='flex flex-wrap w-full justify-between gap-4'>

				<motion.div className='flex flex-wrap align-middle gap-4'>

					<motion.div
						className='bg-slate-50 flex justify-center align-middle rounded-lg overflow-hidden shadow-md'
					>
						<Image alt='german flag' loading='lazy' className='object-cover' src={Germany_Flag} width={12} height={40} />
						<motion.div className='flex overflow-hidden items-center px-4 text-2xl'>
							{props.word.value.german}
						</motion.div>
					</motion.div>

					<motion.div
						className='bg-slate-50 flex justify-center align-middle rounded-lg overflow-hidden shadow-md'
					>
						<Image alt='spanish flag' loading='lazy' src={Spanish_Flag} width={12} height={40} />
						<motion.div className='flex overflow-hidden items-center px-4 text-2xl'>
							{props.word.value.spanish}
						</motion.div>
					</motion.div>

				</motion.div>

				<motion.div className='flex items-center align-middle gap-4'>

					{ showWordType(props.word.type) }

					<motion.button
						aria-label={`${open ? "close" : "open"} word card`}
						aria-expanded={ open }
						className='transition-all bg-fuchsia-200 border-fuchsia-800 ring-fuchsia-900 focus:ring-2 outline-none flex rounded-lg border-2'
						onClick={() => toggleOpen()}
						onFocus={() => setItemInFocus(true)}
						onBlur={() => setItemInFocus(false)}
						variants={{
							open: {
								rotate: 180,
								transition: {
									rotate: {
										type: 'linear',
										duration: .5,
									},
									default: { ease: "linear" }
								}
							},
							closed: {
								rotate: 0,
								transition: {
									rotate: {
										type: 'linear',
										duration: .5,
									},
									default: { ease: "linear" }
								}
							}
						}}
					>
						<ArrowDown width={30} height={30} strokeWidth={2} color="rgb(134 25 143)" />
					</motion.button>

				</motion.div>

			</motion.div>

			<motion.div
				variants={{
					open: {
						height: 300,
						transition: {
							type: 'spring',
							bounce: 0,
							duration: 0.7,
							delayChildren: 0.3,
							staggerChildren: 0.05
						}
					},
					closed: {
						height: 0,
						transition: {
							type: 'spring',
							bounce: 0,
							duration: 0.3
						}
					}
				}}
				style={{ pointerEvents: open ? 'auto' : 'none' }}
			>

				{showBody()}

			</motion.div>

			<motion.div
				className='flex justify-end'
			>
				<motion.div
					className='flex '
					variants={{
						closed: {
							height: 0
						}
					}}
				>

					<motion.button
						className='w-10 h-10 m-1 flex items-center justify-center p-1 z-10 rounded-lg outline-none bg-blue-300 border-blue-600 border-2 ring-gray-400 focus:ring-4'
						aria-label='edit word'
						onClick={() => { editWord() }}
						onFocus={() => setItemInFocus(true)}
						onBlur={() => setItemInFocus(false)}
						tabIndex={open ? 1 : -1}
						variants={{
							open: {
								scale: 1,
								rotate: 360,
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.7
								}
							},
							closed: {
								scale: 0,
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.7
								}
							}
						}}
					>
						<EditIcon width={20} height={20} stroke="black" fill="black" />
					</motion.button>

					<motion.button
						className='m-1 flex items-center justify-center p-1 z-10 rounded-lg outline-none bg-red-800 ring-gray-400 focus:ring-4'
						aria-label='edit word'
						onClick={() => { handleRemoveWord() }}
						tabIndex={open ? 1 : -1}
						variants={{
							open: {
								scale: 1,
								rotate: 360,
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.7
								}
							},
							closed: {
								scale: 0,
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.7
								}
							}
						}}
					>
						<CloseIcon width={30} height={30} color={'white'} />
					</motion.button>

				</motion.div>
			</motion.div>

		</motion.div>
	)
}

export default WordCard
