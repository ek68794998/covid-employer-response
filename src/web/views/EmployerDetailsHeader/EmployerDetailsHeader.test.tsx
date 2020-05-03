import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";
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
	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

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

	test("renders using a complete employer record", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

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
