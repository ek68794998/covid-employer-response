import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import LoadingIndicator from "./LoadingIndicator";

describe("<LoadingIndicator />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<LoadingIndicator />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
