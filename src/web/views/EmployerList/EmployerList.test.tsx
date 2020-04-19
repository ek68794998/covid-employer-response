import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import EmployerList from "./EmployerList";

jest.mock(
	"../EmployerListItem/EmployerListItem",
	() => mockComponent("EmployerListItem"));

jest.mock(
	"../EmployerPageDetails/EmployerPageDetails",
	() => mockComponent("EmployerPageDetails"));

describe("<EmployerList />", () => {
	const strings: LocalizedStrings = {
		loading: ploc("loading"),
		noResults: ploc("noResults"),
	};

	const createConfigStore = (): Store<AppState, AnyAction> => configureStore({ strings });

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerList
							searchFilter={new EmployerListSearchFilter()}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders empty list of employers", () => {
		const record: EmployerRecordMetadata = new EmployerRecordMetadata(0, 0, "fair");

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

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerList
							searchFilter={filter}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders list of employers", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsMetadata: {
					e1: Object.assign(new EmployerRecordMetadata(0, 0, "fair"), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e1",
						location: new EmployerLocation(),
						name: "Alpha",
					}),
					e2: Object.assign(new EmployerRecordMetadata(0, 0, "fair"), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e2",
						location: new EmployerLocation(),
						name: "Beta",
					}),
					e3: Object.assign(new EmployerRecordMetadata(0, 0, "fair"), {
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

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerList
							searchFilter={filter}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
