import type { IBase } from './root.types'

export enum Status {
	TODO = 'todo',
	IN_PROGRESS = 'in_progress',
	DONE = 'done'
}

export interface ITaskResponse extends IBase {
	title: string
	description: string
	status: Status
	order: number
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
