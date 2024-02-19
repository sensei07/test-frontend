import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { IBoardResponse } from '@/types/board.types'

import { boardService } from '@/services/board.service'

export const useBoards = () => {
	const { data } = useQuery({
		queryKey: ['boards'],
		queryFn: () => boardService.getBoards()
	})

	const [items, setItems] = useState<IBoardResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items }
}
