import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../../state/AppState";
import configureStore from "../../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearchFilter";

import EmployeeCountFilterControl from "./EmployeeCountFilterControl";

describe("<EmployeeCountFilterControl />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				filters: {
					employeesDefault: "employeesDefault string",
					employeesLarge: "employeesLarge string",
					employeesMedium: "employeesMedium string",
					employeesSmall: "employeesSmall string",
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployeeCountFilterControl
							initialFilter={new EmployerListSearchFilter()}
							onUpdateFilterValue={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
