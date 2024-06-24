const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'skins.minimog.co',
				pathname: '**',
			},
		],
	},
	productionBrowserSourceMaps: false,
	optimizeFonts: false,
};

const customConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: `http://localhost:3000/api/:slug*`,
			},
		];
	},
};

module.exports = {
	...nextConfig,
	...customConfig,
};
