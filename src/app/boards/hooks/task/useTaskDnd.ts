import { Status } from '@/types/task.types'

import { useUpdateTask } from './useUpdateTask'
import { useUpdateTasksOrder } from './useUpdateTasksOrder'

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result = {}
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}

export function useTaskDnd(state, setState) {
	const { updateTask } = useUpdateTask()
	const { mutate } = useUpdateTasksOrder()

	function onDragEnd(result) {
		const { source, destination, draggableId } = result

		const destinationColumnId = +result.destination?.droppableId

		if (!destination ?? destinationColumnId) {
			return
		}
		const sInd = +source.droppableId
		const dInd = +destination.droppableId

		if (sInd === dInd) {
			if (source.index === destination.index) return
			const items = reorder(state[sInd], source.index, destination.index)
			const newState = [...state]
			newState[sInd] = items
			mutate(newState[sInd].map(item => item.id))
			setState(newState)
		} else {
			const result = move(state[sInd], state[dInd], source, destination)
			const newState = [...state]
			newState[sInd] = result[sInd]
			newState[dInd] = result[dInd]

			if (destinationColumnId === 0) {
				updateTask({
					id: draggableId,
					data: {
						status: Status.TODO
					}
				})
			}

			if (destinationColumnId === 1) {
				updateTask({
					id: draggableId,
					data: {
						status: Status.IN_PROGRESS
					}
				})
			}

			if (destinationColumnId === 2) {
				updateTask({
					id: draggableId,
					data: {
						status: Status.DONE
					}
				})
			}

			mutate(newState[sInd].map(item => item.id))
			mutate(newState[dInd].map(item => item.id))
			setState(newState)
		}
	}

	return { onDragEnd }
}
