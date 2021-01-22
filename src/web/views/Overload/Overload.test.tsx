import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import Overload from "./Overload";

describe("<Overload />", (): void => {
	test("renders without exploding", (): void => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<Overload />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
