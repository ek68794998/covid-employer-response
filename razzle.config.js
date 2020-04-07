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
};
