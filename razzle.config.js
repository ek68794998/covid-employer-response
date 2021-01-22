"use strict";

module.exports = {
	plugins: [
		"scss",
		{
			name: "typescript",
			options: {
				useEslint: true,
				forkTsChecker: {
					tslint: false,
				},
			},
		},
	],
	modifyWebpackConfig({
		env: {
			target, // the target 'node' or 'web'
			dev, // is this a development build? true or false
		},
		webpackConfig, // the created webpack config
		webpackObject, // the imported webpack node module
		options: {
			pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
			razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
			webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
		},
		paths, // the modified paths that will be used by Razzle.
	}) {
		if (!dev) {
			if (process.env.STATS === "yes") {
				const { StatsWriterPlugin } = require("webpack-stats-plugin");
	
				webpackConfig.plugins = [
					...webpackConfig.plugins,
					new StatsWriterPlugin({
						fields: null,
						filename: "./stats.json",
					}),
				];
			}

			webpackConfig.performance = {
				maxAssetSize: 400000,
				maxEntrypointSize: 400000,
			};
		}

		return webpackConfig;
	},
};
