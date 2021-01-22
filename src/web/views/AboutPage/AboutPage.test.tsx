import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import AboutPage from "./AboutPage";

jest.mock(
	"react-markdown",
	() => mockComponent("ReactMarkdown"));

describe("<AboutPage />", () => {
	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<AboutPage />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
