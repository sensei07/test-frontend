import type { IBase } from './root.types'

export interface IBoardResponse extends IBase {
	title: string
}

export type TypeBoardFormState = Partial<
	Omit<IBoardResponse, 'id' | 'createdAt' | 'updatedAt'>
>
