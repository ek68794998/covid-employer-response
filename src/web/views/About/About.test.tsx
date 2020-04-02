import React from "react";
import { render } from "react-dom";

import About from "./About";

jest.mock("react-redux", () => ({
	useSelector: jest.fn().mockReturnValue({
		about: "About",
		appTitle: "Test App",
		citationTypeDescriptions: {
			hearsay: "hearsay description",
			publication: "publication description",
			statement: "statement description",
		},
		citationTypes: {
			hearsay: "hearsay",
			publication: "publication",
			statement: "statement",
		},
	}),
}));

describe("<About />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");

		render(
			<About.WrappedComponent />,
			div,
		);
	});
});
