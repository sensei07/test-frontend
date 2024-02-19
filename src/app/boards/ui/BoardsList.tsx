'use client'

import { useBoards } from '../hooks/board/useBoards'

import { BoardCard } from './BoardCard'
import { CreateBoard } from './CreateBoard'

export function BoardsList() {
	const { items } = useBoards()

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{items?.map(board => (
				<BoardCard
					key={board.id}
					id={board.id}
					title={board.title}
				/>
			))}
			<CreateBoard />
		</div>
	)
}
