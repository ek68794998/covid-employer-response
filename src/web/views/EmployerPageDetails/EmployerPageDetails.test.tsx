import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../../../__tests__/TestUtils";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPageDetails from "./EmployerPageDetails";

jest.mock(
	"../EmployerDetailsHeader/EmployerDetailsHeader",
	() => mockComponent("EmployerDetailsHeader"));

jest.mock(
	"../EmployerCitationList/EmployerCitationList",
	() => mockComponent("EmployerCitationList"));

describe("<EmployerPageDetails />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> => configureStore({});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails linkedEmployers={[]} primaryEmployer={new EmployerRecord()} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders using an employer record", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const e: EmployerRecord =
			Object.assign(new EmployerRecord(), {
				citations: [{
					positivity: 2,
					summary: "A very good summary about Contoso.",
					type: "hearsay",
				}, {
					positivity: 0,
					sources: [ { name: "CBS", link: "http://cbs", date: "2015-01-01T01:01:01Z" } ],
					summary: "A very good summary about Contoso.",
					type: "publication",
				}, {
					positivity: -1,
					sources: [ { name: "NBC", link: "http://nbc", date: "2016-01-01T01:01:01Z" } ],
					summary: "A very good summary about Contoso.",
					type: "statement",
				}],
				employeesBefore: { type: "exactly", upperBound: 12345, year: 2015 },
				id: "contoso",
				image: "consoto.svg",
				location: { city: "City", country: "us", international: true },
				name: "Contoso",
				summary: "Contoso is a good company.",
			});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails linkedEmployers={[]} primaryEmployer={e} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
