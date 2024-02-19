'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'

import { filterTasks } from '@/constants/filter-tasks'

import { Status } from '@/types/task.types'

import { useTaskDnd } from '../../../hooks/task/useTaskDnd'

import { KanbanColumn } from './KanbanColumn'
import styles from './KanbanView.module.scss'
import { CreateTask } from '@/app/boards/ui/task/kanban-view/CreateTask'

export function KanbanView({ items, boardId }) {
	const router = useRouter()
	const filteredTasks = [
		filterTasks(items, Status.TODO),
		filterTasks(items, Status.IN_PROGRESS),
		filterTasks(items, Status.DONE)
	]
	const getStatus = (index: number) => {
		if (index === 0) return { value: Status.TODO, label: 'Todo' }
		if (index === 1) return { value: Status.IN_PROGRESS, label: 'In progress' }
		if (index === 2) return { value: Status.DONE, label: 'Done' }
	}

	const [tasks, setTasks] = useState(filteredTasks)
	const [searchInputValue, setSearchInputValue] = useState(boardId)

	const { onDragEnd } = useTaskDnd(tasks, setTasks)

	const onChangeUrl = e => {
		e.preventDefault()
		setSearchInputValue(e.target.value)
	}

	const searchByBoardId = async () => {
		router.replace(`/boards/${searchInputValue}`)
	}

	useEffect(() => {
		if (items) setTasks(filteredTasks)
	}, [items])

	return (
		<>
			<div className='flex justify-between mb-4 gap-5'>
				<CreateTask />
				<div className='flex flex-col w-[50%]'>
					<Input
						onChange={onChangeUrl}
						value={searchInputValue}
						placeholder='Search board by Id'
					/>
					<Button onClick={searchByBoardId}>Load</Button>
				</div>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className={styles.board}>
					{tasks.map((element, ind) => (
						<div
							key={ind}
							className='flex flex-col'
						>
							<KanbanColumn
								ind={ind}
								label={getStatus(ind).label}
								element={element}
							/>
						</div>
					))}
				</div>
			</DragDropContext>
		</>
	)
}
