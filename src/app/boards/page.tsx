import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { BoardsList } from './ui/BoardsList'

export const metadata: Metadata = {
	title: 'Time blocking',
	...NO_INDEX_PAGE
}

export default function BoardsPage() {
	return (
		<div>
			<Heading title='Boards' />
			<BoardsList />
		</div>
	)
}
