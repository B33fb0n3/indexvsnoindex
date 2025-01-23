import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pick-test.b-cdn.net',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default withAxiom(nextConfig);
