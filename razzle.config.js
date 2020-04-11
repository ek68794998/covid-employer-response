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
	modify(config, { target, dev }, webpack) {
		if (!dev) {
			if (process.env.STATS === "yes") {
				const { StatsWriterPlugin } = require("webpack-stats-plugin");
	
				config.plugins = [
					...config.plugins,
					new StatsWriterPlugin({
						fields: null,
						filename: "./stats.json",
					}),
				];
			}

			config.performance = {
				maxAssetSize: 400000,
				maxEntrypointSize: 400000,
			};
		}

		return config;
	},
};
