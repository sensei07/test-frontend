import { BoardInfo } from '../ui/BoardInfo'

import { boardService } from '@/services/board.service'

export default async function BoardPage({
	params: { id }
}: {
	params: { id: string }
}) {
	const res = await boardService.getBoard(id)

	return (
		<>
			{res.data.id ? (
				<BoardInfo data={res.data} />
			) : (
				'There are no boards with such an ID'
			)}
		</>
	)
}
