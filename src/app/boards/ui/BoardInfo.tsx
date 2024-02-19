'use client'

import { KanbanView } from './task/kanban-view/KanbanView'
import { useTasks } from '@/app/boards/hooks/task/useTasks'
import { BoardTitle } from '@/app/boards/ui/BoardTitle'

export function BoardInfo({ data }) {
	const { tasks, isLoading } = useTasks(data.id)

	return (
		<>
			<BoardTitle
				title={data.title}
				boardId={data.id}
			/>
			{isLoading
				? 'loading'
				: tasks?.data && (
						<KanbanView
							items={tasks.data}
							boardId={data.id}
						/>
					)}
		</>
	)
}
