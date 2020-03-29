import React from "react";
import { render } from "react-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import SearchInput from "./SearchInput";

jest.mock("react-redux", () => ({
	useSelector: (): {} => ({
		getStrings: (): LocalizedStrings => ({ search: "Search" }),
	}),
}));

describe("<SearchInput />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");

		render(
			<SearchInput.WrappedComponent />,
			div,
		);
	});
});
