import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerDetailsHeader from "./EmployerDetailsHeader";

jest.mock(
	"../EmployerActionLinks/EmployerActionLinks",
	() => mockComponent("EmployerActionLinks"));

describe("<EmployerDetailsHeader />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> =>
		configureStore({
			strings: {
				detailDescriptions: {
					aka: ploc("aka"),
					employees: ploc("employees"),
					location: ploc("location"),
					rating: ploc("rating"),
					ratingCounts: ploc("ratingCounts"),
					ticker: ploc("ticker"),
				},
				ratingLabels: {
					fair: ploc("fair"),
					good: ploc("good"),
					poor: ploc("poor"),
				},
			},
		});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerDetailsHeader
							employer={new EmployerRecord()}
							onClickEmployerName={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders using a complete employer record", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const e: EmployerRecord = {
			aliases: [ "MyContoso" ],
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
			officialWebsite: "",
			shortName: "Co.",
			summary: "Contoso is a good company.",
			ticker: "CTS",
			wiki: "Contoso, Inc.",
		};

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerDetailsHeader
							employer={e}
							onClickEmployerName={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
