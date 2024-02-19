import { Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/buttons/Button'

import { useDeleteBoard } from '@/app/boards/hooks/board/useDeleteBoard'

interface BoardCardProps {
	id: string
	title: string
}

export function BoardCard({ id, title }: BoardCardProps) {
	const { deleteBoard } = useDeleteBoard(id)

	return (
		<div className='flex justify-between '>
			<Link
				href={`/boards/${id}`}
				className='block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
			>
				<h5 className='font-bold tracking-tight text-gray-900 dark:text-white'>
					{title}
				</h5>
			</Link>
			<Button onClick={() => deleteBoard(id)}>
				<Trash2 />
			</Button>
		</div>
	)
}
