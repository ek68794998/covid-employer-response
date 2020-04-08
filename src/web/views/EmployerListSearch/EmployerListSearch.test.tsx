import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListSearch from "./EmployerListSearch";

jest.mock(
	"./EmployerListFilterControl/InternationalTypeFilterControl",
	() => mockComponent("InternationalTypeFilterControl"));

jest.mock(
	"./EmployerListFilterControl/EmployeeCountFilterControl",
	() => mockComponent("EmployeeCountFilterControl"));

describe("<EmployerListSearch />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> =>
		configureStore({
			strings: {
				search: ploc("search"),
			},
		});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearch onChange={(): void => { /* Do nothing. */ }} />
					</BrowserRouter>
				</Provider>,
			);

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});

	test("opens 'filters' dropdown", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearch onChange={(): void => { /* Do nothing. */ }} />
					</BrowserRouter>
				</Provider>,
			);

		const selectors: ReactTestInstance[] =
			testRenderer.root.findAll((node: ReactTestInstance) => node.type === "button");

		selectors[0].props.onClick();

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});
});
