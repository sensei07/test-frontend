/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	env: {
		BASE_URL: "https://test-backend-production-09c4.up.railway.app/api",
	},

};

export default nextConfig;
