import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerDetailsHeader from "./EmployerDetailsHeader";

jest.mock(
	"../EmployerActionLinks/EmployerActionLinks",
	() => mockComponent("EmployerActionLinks"));

jest.mock(
	"../EmployerRatingPill/EmployerRatingPill",
	() => mockComponent("EmployerRatingPill"));

describe("<EmployerDetailsHeader />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> =>
		configureStore({
			strings: {
				detailDescriptions: {
					aka: ploc("aka"),
					employees: ploc("employees"),
					linkToEmployer: ploc("linkToEmployer"),
					location: ploc("location"),
					rating: ploc("rating"),
					ratingCounts: ploc("ratingCounts"),
					ticker: ploc("ticker"),
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
							employer={new EmployerRecordMetadata(0, 0, "fair")}
							onClickEmployerName={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders using a complete employer record", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const e: EmployerRecordMetadata =
			new EmployerRecordMetadata(1, 1, "fair");

		Object.assign(e, {
			aliases: [ "MyContoso" ],
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
		});

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
