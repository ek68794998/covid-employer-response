import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPageDetails from "./EmployerPageDetails";

jest.mock(
	"../EmployerCitationList/EmployerCitationList",
	(): any => mockComponent("EmployerCitationList"));

jest.mock(
	"../EmployerListItem/EmployerListItem",
	(): any => mockComponent("EmployerListItem"));

jest.mock(
	"../EmployerRatingPill/EmployerRatingPill",
	(): any => mockComponent("EmployerRatingPill"));

describe("<EmployerPageDetails />", (): void => {
	const dateToLocaleStringPrototype: any = Date.prototype.toLocaleDateString;

	afterEach((): void => {
		Date.prototype.toLocaleDateString = dateToLocaleStringPrototype;
	});

	beforeEach((): void => {
		Date.prototype.toLocaleDateString = function(): string {
			return `${this.getUTCFullYear()}-${this.getUTCMonth() + 1}-${this.getUTCDate()}`;
		};
	});

	test("renders without exploding", async (): Promise<void> => {
		const e: EmployerRecord = new EmployerRecord();

		e.id = "employer";
		e.name = "Employer";

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

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails employer={e} />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});

	test("renders using an employer record", async (): Promise<void> => {
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

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPageDetails employer={e} />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
