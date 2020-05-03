import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import { EmployerRouteContext, EmployerRouteContextData, DefaultContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployerList from "./EmployerList";

jest.mock(
	"../EmployerListItem/EmployerListItem",
	() => mockComponent("EmployerListItem"));

jest.mock(
	"../LoadingIndicator/LoadingIndicator",
	() => mockComponent("LoadingIndicator"));

describe("<EmployerList />", () => {
	const strings: LocalizedStrings = {
		noResults: ploc("noResults"),
	};

	const createConfigStore = (): Store<AppState, AnyAction> => configureStore({ strings });

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerList />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders empty list of employers", () => {
		const record: EmployerRecordMetadata = new EmployerRecordMetadata(0, 0, 0, "fair");

		record.employeesBefore = new EmployerEmployeeProfile();
		record.id = "e1";
		record.location = new EmployerLocation();
		record.name = "Alpha";

		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsMetadata: {
					[record.id]: record,
				},
			},
			strings,
		});

		const filter: EmployerListSearchFilter = new EmployerListSearchFilter();

		filter.text = "NORESULTSPLEASE";

		const contextValue: EmployerRouteContextData = {
			...DefaultContextData,
			searchFilters: filter,
		};

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={contextValue}>
							<EmployerList />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders list of employers", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsMetadata: {
					e1: Object.assign(new EmployerRecordMetadata(0, 0, 0, "fair"), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e1",
						location: new EmployerLocation(),
						name: "Alpha",
					}),
					e2: Object.assign(new EmployerRecordMetadata(0, 0, 0, "fair"), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e2",
						location: new EmployerLocation(),
						name: "Beta",
					}),
					e3: Object.assign(new EmployerRecordMetadata(0, 0, 0, "fair"), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e3",
						location: new EmployerLocation(),
						name: "Delta",
					}),
				},
			},
			strings,
		});

		const filter: EmployerListSearchFilter = new EmployerListSearchFilter();

		filter.text = "TA";

		const contextValue: EmployerRouteContextData = {
			...DefaultContextData,
			searchFilters: filter,
		};

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={contextValue}>
							<EmployerList />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
