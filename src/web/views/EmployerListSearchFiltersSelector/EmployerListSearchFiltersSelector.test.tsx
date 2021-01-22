import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListSearchFiltersSelector from "./EmployerListSearchFiltersSelector";

describe("<EmployerListSearchFiltersSelector />", (): void => {
	beforeEach((): void => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
	});

	afterEach((): void => {
		(global.Math.random as any).mockRestore();
	});

	const createConfigStore = (): Store<AppState, AnyAction> => configureStore({});

	test("renders as checkboxes", (): void => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"Foo Check 1"}
							multiselect={true}
							onChange={(): void => { /* Do nothing. */}}
						/>
						<EmployerListSearchFiltersSelector
							initialValue={false}
							label={"Foo Check 2"}
							multiselect={true}
							onChange={(): void => { /* Do nothing. */}}
						/>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"Foo Check 3"}
							multiselect={true}
							onChange={(): void => { /* Do nothing. */}}
						/>
					</BrowserRouter>
				</Provider>,
			);

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});

	test("renders as radio buttons", (): void => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersSelector
							initialValue={false}
							label={"Foo Radio 1"}
							multiselect={false}
							onChange={(): void => { /* Do nothing. */}}
						/>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"Foo Radio 2"}
							multiselect={false}
							onChange={(): void => { /* Do nothing. */}}
						/>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"Foo Radio 3"}
							multiselect={false}
							onChange={(): void => { /* Do nothing. */}}
						/>
					</BrowserRouter>
				</Provider>,
			);

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});

	test("handles form changes", (): void => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const clickFn: jest.Mock<any, any> = jest.fn();

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersSelector
							initialValue={true}
							label={"Foo Check 1"}
							multiselect={true}
							onChange={(): void => clickFn(1)}
						/>
						<EmployerListSearchFiltersSelector
							initialValue={false}
							label={"Foo Check 2"}
							multiselect={true}
							onChange={(): void => clickFn(2)}
						/>
					</BrowserRouter>
				</Provider>,
			);

		const selectors: ReactTestInstance[] =
			testRenderer.root.findAllByType(EmployerListSearchFiltersSelector);

		selectors[1].props.onChange();

		expect(clickFn.mock.calls.length).toBe(1);
		expect(clickFn.mock.calls[0][0]).toBe(2);
	});
});
