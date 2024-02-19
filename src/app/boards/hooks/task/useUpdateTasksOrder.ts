import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export function useUpdateTasksOrder() {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['update order task'],
		mutationFn: (ids: string[]) => taskService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return { mutate }
}
