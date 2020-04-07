import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../../__tests__/TestUtils";

import { AppState } from "../../../state/AppState";
import configureStore from "../../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearchFilter";

import EmployeeCountFilterControl from "./EmployeeCountFilterControl";

jest.mock(
	"../EmployerListFilterControl/EmployerListFilterControl",
	() => mockComponent("EmployerListFilterControl"));

describe("<EmployeeCountFilterControl />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				filters: {
					employeesDefault: ploc("employeesDefault"),
					employeesLarge: ploc("employeesLarge"),
					employeesMedium: ploc("employeesMedium"),
					employeesSmall: ploc("employeesSmall"),
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployeeCountFilterControl
							filter={new EmployerListSearchFilter()}
							onUpdateFilter={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
