import type { ITaskResponse } from '@/types/task.types'
import { Status } from '@/types/task.types'

export const filterTasks = (
	tasks: ITaskResponse[] | undefined,
	value: string
) => {
	switch (value) {
		case Status.TODO:
			return tasks?.filter(item => item.status === Status.TODO)

		case Status.IN_PROGRESS:
			return tasks?.filter(item => item.status === Status.IN_PROGRESS)

		case Status.DONE:
			return tasks?.filter(item => item.status === Status.DONE)

		default:
			return []
	}
}
