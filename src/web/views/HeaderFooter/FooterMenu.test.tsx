import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import FooterMenu from "./FooterMenu";

describe("<FooterMenu />", (): void => {
	test("renders without exploding", async (): Promise<void> => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<FooterMenu />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
