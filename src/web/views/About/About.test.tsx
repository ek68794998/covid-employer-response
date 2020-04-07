import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import About from "./About";

describe("<About />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: ploc("about"),
				appTitle: ploc("appTitle"),
				citationTypeDescriptions: {
					hearsay: ploc("hearsayDescription"),
					publication: ploc("publicationDescription"),
					statement: ploc("statementDescription"),
				},
				citationTypes: {
					hearsay: ploc("hearsay"),
					publication: ploc("publication"),
					statement: ploc("statement"),
				},
				submit: ploc("submit"),
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
