import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { axiosClassic } from '@/api/interceptors'

class TaskService {
	private BASE_URL = '/tasks'

	async getTasks(id: string) {
		return await axiosClassic.get<ITaskResponse[]>(
			`${this.BASE_URL}?boardId=${id}`
		)
	}

	async createTask(data: TypeTaskFormState) {
		return await axiosClassic.post(this.BASE_URL, data)
	}

	async updateOrderTimeBlock(ids: string[]) {
		return await axiosClassic.patch(`${this.BASE_URL}/update-order`, {
			ids
		})
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		return await axiosClassic.patch(`${this.BASE_URL}/${id}`, data)
	}

	async deleteTask(id: string) {
		return await axiosClassic.delete(`${this.BASE_URL}/${id}`)
	}
}

export const taskService = new TaskService()
