import React from "react";
import { render } from "react-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import About from "./About";

jest.mock("react-redux", () => ({
	useSelector: (): {} => ({
		getStrings: (): LocalizedStrings => ({ about: "About" }),
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
