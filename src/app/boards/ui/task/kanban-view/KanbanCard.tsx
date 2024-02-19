import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import { Status } from '@/types/task.types'

import { useDeleteTask } from '../../../hooks/task/useDeleteTask'
import { useTaskDebounce } from '../../../hooks/task/useTaskDebounce'

import styles from './KanbanView.module.scss'

interface IKanbanCard {
	item: ITaskResponse
}

export function KanbanCard({ item }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			title: item.title,
			status: item.status,
			description: item.description,
			boardId: item.boardId
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.done]: item.status === Status.DONE
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>

				<Controller
					control={control}
					name='status'
					render={({ field: { onChange } }) => {
						const checkboxStatus =
							item.status === Status.TODO || item.status === Status.IN_PROGRESS
								? Status.DONE
								: Status.TODO
						return (
							<Checkbox
								onChange={() => onChange(checkboxStatus)}
								checked={item.status === Status.DONE}
							/>
						)
					}}
				/>

				<div className='flex flex-col ml-2'>
					<TransparentField
						placeholder={'Enter title'}
						{...register('title')}
					/>
					<TransparentField
						placeholder='Enter description'
						{...register('description')}
					/>
				</div>
			</div>
			<div className={styles.cardActions}>
				<button
					onClick={() => deleteTask(item.id)}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
