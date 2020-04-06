import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import About from "./About";

describe("<About />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: "áβôúƭ",
				appTitle: "áƥƥTïƭℓè",
				citationTypeDescriptions: {
					hearsay: "λèářƨá¥Ðèƨçřïƥƭïôñ",
					publication: "ƥúβℓïçáƭïôñÐèƨçřïƥƭïôñ",
					statement: "ƨƭáƭè₥èñƭÐèƨçřïƥƭïôñ",
				},
				citationTypes: {
					hearsay: "λèářƨá¥",
					publication: "ƥúβℓïçáƭïôñ",
					statement: "ƨƭáƭè₥èñƭ",
				},
				submit: "ƨúβ₥ïƭ",
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<About />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
