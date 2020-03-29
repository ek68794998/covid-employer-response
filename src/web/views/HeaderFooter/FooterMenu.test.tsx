import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import HeaderMenu from "./HeaderMenu";

jest.mock("react-redux", () => ({
	useSelector: (): {} => ({
		getStrings: (): LocalizedStrings => ({
			about: "About",
			appTitle: "App Title",
			appTitleShort: "AT",
			home: "Home",
		}),
	}),
}));

describe("<HeaderMenu />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");

		render(
			<BrowserRouter>
				<HeaderMenu.WrappedComponent />
			</BrowserRouter>,
			div,
		);
	});
});
