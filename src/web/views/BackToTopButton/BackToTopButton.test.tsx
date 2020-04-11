import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import BackToTopButton from "./BackToTopButton";

describe("<BackToTopButton />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> =>
		configureStore({
			strings: {
				backToTop: ploc("backToTop"),
			},
		});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		(global as any).scrollY = 0;

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<BackToTopButton />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("shows button when scrolled down", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		(global as any).scrollY = 50;

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<BackToTopButton />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
