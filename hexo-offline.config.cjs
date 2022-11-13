module.exports = {
	maximumFileSizeToCacheInBytes: 10485760,
	globPatterns: [
		'**/*.{svg,eot,woff,woff2,min.js,min.css}'
	],
	globDirectory: './public',
	swDest: './public/service-worker.js',
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/cdn\.yuameshi\.top\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/www\.yuameshi\.top\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/blog-old\.yuameshi\.top\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/,
			handler: 'CacheFirst',
		},
	],
};
