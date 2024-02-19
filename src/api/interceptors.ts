import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:8000/api',
	headers: {
		'Content-Type': 'application/json'
	}
}

const axiosClassic = axios.create(options)

export { axiosClassic }
