import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'

import { axiosClassic } from '@/api/interceptors'

class BoardService {
	private BASE_URL = '/boards'

	async getBoard(id: string) {
		return await axiosClassic.get<IBoardResponse>(`${this.BASE_URL}/${id}`)
	}

	async getBoards() {
		return await axiosClassic.get<IBoardResponse[]>(this.BASE_URL)
	}

	async createBoard(data: TypeBoardFormState) {
		return await axiosClassic.post(this.BASE_URL, data)
	}

	async updateBoard(id: string, data: TypeBoardFormState) {
		return await axiosClassic.patch(`${this.BASE_URL}/${id}`, data)
	}

	async deleteBoard(id: string) {
		return await axiosClassic.delete(`${this.BASE_URL}/${id}`)
	}
}

export const boardService = new BoardService()
