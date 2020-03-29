import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import FooterMenu from "./FooterMenu";

jest.mock("react-redux", () => ({
	useSelector: (): {} => ({
		getStrings: (): LocalizedStrings => ({
			appTitle: "App Title",
		}),
	}),
}));

describe("<FooterMenu />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");

		render(
			<BrowserRouter>
				<FooterMenu.WrappedComponent />
			</BrowserRouter>,
			div,
		);
	});
});
