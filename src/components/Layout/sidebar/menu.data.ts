import { KanbanSquare } from 'lucide-react'

import { PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: KanbanSquare,
		link: PAGES.BOARDS,
		name: 'Boards'
	}
]
