import { Draggable, Droppable } from '@hello-pangea/dnd'

import type { ITaskResponse } from '@/types/task.types'

import { KanbanCard } from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	ind: number
	label: string
	element: ITaskResponse
}

export function KanbanColumn({ ind, label, element }: IKanbanColumn) {
	return (
		<Droppable
			key={ind}
			droppableId={`${ind}`}
		>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>

						{element.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<KanbanCard
											key={item.id}
											item={item}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				</div>
			)}
		</Droppable>
	)
}
