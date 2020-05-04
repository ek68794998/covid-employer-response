import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPageDetails from "./EmployerPageDetails";

jest.mock(
	"../EmployerCitationList/EmployerCitationList",
	() => mockComponent("EmployerCitationList"));

jest.mock(
	"../EmployerListItem/EmployerListItem",
	() => mockComponent("EmployerListItem"));

jest.mock(
	"../EmployerRatingPill/EmployerRatingPill",
	() => mockComponent("EmployerRatingPill"));

describe("<EmployerPageDetails />", () => {
	const dateToLocaleStringPrototype: any = Date.prototype.toLocaleDateString;

	afterEach(() => {
		Date.prototype.toLocaleDateString = dateToLocaleStringPrototype;
	});

	beforeEach(() => {
		Date.prototype.toLocaleDateString = function(): string {
			return `${this.getUTCFullYear()}-${this.getUTCMonth() + 1}-${this.getUTCDate()}`;
		};
	});

	test("renders without exploding", async () => {
		const e: EmployerRecord = new EmployerRecord();

		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsComplete: {
					[e.id]: e,
				},
				itemsMetadata: {
					[e.id]: EmployerRecord.toMetadata(e),
				},
			},
			strings: await getPlocStringsAsync(),
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails employer={new EmployerRecord()} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders using an employer record", async () => {
		const e: EmployerRecord =
			Object.assign(new EmployerRecord(), {
				citations: [{
					positivity: 2,
					summary: "A very good summary about Contoso.",
					type: "hearsay",
				}, {
					positivity: 0,
					sources: [ { name: "CBS", link: "http://cbs", date: "2020-05-01T01:01:01Z" } ],
					summary: "A very good summary about Contoso.",
					type: "publication",
				}, {
					positivity: -1,
					sources: [ { name: "NBC", link: "http://nbc", date: "2020-06-01T01:01:01Z" } ],
					summary: "A very good summary about Contoso.",
					type: "statement",
				}],
				employeesAfter: { type: "approximately", upperBound: 10123, year: 2017 },
				employeesBefore: { type: "exactly", upperBound: 12345, year: 2015 },
				id: "contoso",
				image: "consoto.svg",
				location: { city: "City", country: "us", international: true },
				name: "Contoso",
				summary: "Contoso is a good company.",
			});

		e.lastUpdated = EmployerRecord.getLastUpdateDate(e).toISOString();

		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsComplete: {
					[e.id]: e,
				},
				itemsMetadata: {
					[e.id]: EmployerRecord.toMetadata(e),
				},
			},
			strings: await getPlocStringsAsync(),
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails employer={e} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
