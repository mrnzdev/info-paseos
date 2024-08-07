/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'mvohgamnezdswpzzafil.supabase.co',
				pathname: '/storage/v1/object/public/paseos-imagenes/*'
			}
		]
	}
}

export default nextConfig
