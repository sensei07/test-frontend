'use client'

import clsx from 'clsx'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/buttons/Button'

import { useUpdateBoard } from '@/app/boards/hooks/board/useUpdateBoard'

export function BoardTitle({ title, boardId }) {
	const titleRef = useRef<HTMLHeadingElement>(null)
	const [isEditing, setIsEditing] = useState(false)

	const turnOnEditing = () => {
		if (isEditing) {
			return
		}
		setIsEditing(true)
	}

	const titleClasses = clsx({
		'cursor-pointer': !isEditing,
		'cursor-text': isEditing
	})

	const { updateBoard } = useUpdateBoard()
	const onBlur = () => {
		setIsEditing(false)
		if (title === titleRef.current?.innerText) return
		updateBoard({
			id: boardId,
			data: {
				title: titleRef.current?.innerText || 'Untitled'
			}
		})
	}

	return (
		<div className='flex justify-start gap-20 items-center mb-8 '>
			<h1
				className={twMerge(
					'text-white text-4xl text-center font-bold transition outline-none',
					titleClasses
				)}
				contentEditable={isEditing}
				ref={titleRef}
				onBlur={onBlur}
			>
				{title ?? ''}
			</h1>
			<Button
				size='xsmall'
				onClick={turnOnEditing}
			>
				Edit title
			</Button>
		</div>
	)
}
