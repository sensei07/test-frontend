import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export function useTasks(key) {
	const { data: tasks, isLoading } = useQuery({
		queryKey: ['tasks', key],
		queryFn: () => taskService.getTasks(key)
	})

	return { tasks, isLoading }
}
