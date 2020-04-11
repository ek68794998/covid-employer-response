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
			config.performance = {
				maxAssetSize: 400000,
				maxEntrypointSize: 400000,
			};
		}

		return config;
	},
};
