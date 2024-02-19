'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'

import { Status } from '@/types/task.types'

import { useOutside } from '@/hooks/useOutside'

import { useCreateTask } from '../../../hooks/task/useCreateTask'

const createBoardSchema = z.object({
	title: z.string().min(1).max(20),
	description: z.string().min(1).max(20)
})

type CreateBoardValues = z.infer<typeof createBoardSchema>

export function CreateTask() {
	const params = useParams<{ tag: string; item: string }>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<CreateBoardValues>({
		resolver: zodResolver(createBoardSchema)
	})

	const { createTask } = useCreateTask()

	const onSubmit = handleSubmit(async values => {
		values.boardId = params.id
		values.status = Status.TODO
		await createTask(values)
		reset()
		setIsShow(false)
	})

	const openForm = () => setIsShow(true)

	return (
		<div
			className='block w-[50%]  p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
			onClick={openForm}
		>
			{isShow ? (
				<form
					ref={ref}
					onSubmit={onSubmit}
					className=''
				>
					<Input
						{...register('title')}
						placeholder='Enter title'
						error={errors.title?.message}
						disabled={isSubmitting}
						className='pr-20'
					/>
					<Input
						{...register('description')}
						placeholder='Enter description'
						error={errors.title?.message}
						disabled={isSubmitting}
						className='pr-20'
					/>
					<Button
						className='text-red'
						type='submit'
						isLoading={isSubmitting}
					>
						Create
					</Button>
				</form>
			) : (
				<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
					+ Create a new task
				</h5>
			)}
		</div>
	)
}
