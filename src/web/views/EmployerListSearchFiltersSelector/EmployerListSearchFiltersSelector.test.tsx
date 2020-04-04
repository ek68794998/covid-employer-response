import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListSearchFiltersSelector from "./EmployerListSearchFiltersSelector";

describe("<EmployerListSearchFiltersSelector />", () => {
	beforeEach(() => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
	});

	afterEach(() => {
		(global.Math.random as any).mockRestore();
	});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"foo"}
							multiselect={false}
							onChange={(): void => { /* Do nothing. */}}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
