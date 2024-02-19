import Link from 'next/link'

import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<span className='text-xl font-bold'>Incode Group test task</span>
				</Link>
				<div className='p-3 relative'>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<footer className='text-xs font-normal text-center p-layout'>
				<a
					href='https://www.youtube.com/c/redgroup/?sub_confirmation=1'
					target='_blank'
					rel='noreferrer'
					className='hover:text-primary text-purple-800 transition-colors'
				>
					Watch code in GitHub
				</a>
			</footer>
		</aside>
	)
}
