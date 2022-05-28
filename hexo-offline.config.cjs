module.exports = {
	maximumFileSizeToCacheInBytes: 10485760,
	globPatterns: [
		'**/*.{png,jpg,jpeg,webp,gif,svg,mp3,mp4,webm,ogg,eot,ttf,woff,woff2,min.js,min.css}'
	],
	globDirectory: './public',
	swDest: './public/service-worker.js',
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/,
			handler: 'CacheFirst',
		},
		{
			urlPattern: /^https:\/\/cdn\.yuameshi\.top\/.*/,
			handler: 'CacheFirst',
		},
	],
};
