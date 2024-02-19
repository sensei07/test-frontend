import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardService } from '@/services/board.service'

export function useDeleteBoard(itemId: string) {
	const queryClient = useQueryClient()

	const { mutate: deleteBoard, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete board', itemId],
		mutationFn: () => boardService.deleteBoard(itemId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['boards']
			})
		}
	})

	return { deleteBoard, isDeletePending }
}
