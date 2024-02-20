import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
}

const axiosClassic = axios.create(options)

export { axiosClassic }
