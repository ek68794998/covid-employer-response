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
					employeesDefault: "è₥ƥℓô¥èèƨÐèƒáúℓƭ",
					employeesLarge: "è₥ƥℓô¥èèƨ£ářϱè",
					employeesMedium: "è₥ƥℓô¥èèƨMèδïú₥",
					employeesSmall: "è₥ƥℓô¥èèƨ§₥áℓℓ",
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
