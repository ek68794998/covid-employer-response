import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import Home from "./Home";

jest.mock(
	"../EmployerListSearch/EmployerListSearch",
	() => mockComponent("EmployerListSearch"));

jest.mock(
	"../EmployerList/EmployerList",
	() => mockComponent("EmployerList"));

describe("<Home />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				appTitle: "áƥƥTïƭℓè",
				home: "λô₥è",
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<Home />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
