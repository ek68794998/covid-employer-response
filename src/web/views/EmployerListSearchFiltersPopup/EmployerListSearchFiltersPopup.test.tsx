import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListSearchFiltersPopup from "./EmployerListSearchFiltersPopup";

jest.mock(
	"../EmployerListSearchFiltersSelector/EmployerListSearchFiltersSelector",
	(): any => mockComponent("EmployerListSearchFiltersSelector"));

describe("<EmployerListSearchFiltersPopup />", (): void => {
	test("renders without exploding", (): void => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersPopup
							childProps={[]}
							multiselect={false}
							onClose={(): void => { /* Do nothing. */ }}
							title={"Title"}
						/>
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
