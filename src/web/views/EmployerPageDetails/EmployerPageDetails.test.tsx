import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
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
	const createConfigStore = (preloaded: Partial<AppState> = {}): Store<AppState, AnyAction> => configureStore({
		strings: {
			detailDescriptions: {
				aka: ploc("aka"),
				edit: ploc("edit"),
				employees: ploc("employees"),
				industry: ploc("industry"),
				linkToEmployer: ploc("linkToEmployer"),
				location: ploc("location"),
				name: ploc("name"),
				officialWebsite: ploc("officialWebsite"),
				rating: ploc("rating"),
				ratingCounts: ploc("ratingCounts"),
				ticker: ploc("ticker"),
				wikipedia: ploc("wikipedia"),
			},
			detailLabels: {
				officialWebsite: ploc("officialWebsiteLabel"),
				wikipedia: ploc("wikipediaLabel"),
			},
			employeeDelta: `${ploc("employeeDelta")}: {change} / {date}`,
			employerSubmitChange: `${ploc("employerSubmitChange")}: {employer}`,
			employerUpdatedDate: `${ploc("employerUpdatedDate")}: {date}`,
		},
		...preloaded,
	});

	const dateToLocaleStringPrototype: any = Date.prototype.toLocaleDateString;

	afterEach(() => {
		Date.prototype.toLocaleDateString = dateToLocaleStringPrototype;
	});

	beforeEach(() => {
		Date.prototype.toLocaleDateString = function(): string {
			return `${this.getUTCFullYear()}-${this.getUTCMonth() + 1}-${this.getUTCDate()}`;
		};
	});

	test("renders without exploding", () => {
		const e: EmployerRecord = new EmployerRecord();

		const store: Store<AppState, AnyAction> = createConfigStore({
			employers: {
				itemsComplete: {
					[e.id]: e,
				},
				itemsMetadata: {
					[e.id]: EmployerRecord.toMetadata(e),
				},
			},
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

	test("renders using an employer record", () => {
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

		const store: Store<AppState, AnyAction> = createConfigStore({
			employers: {
				itemsComplete: {
					[e.id]: e,
				},
				itemsMetadata: {
					[e.id]: EmployerRecord.toMetadata(e),
				},
			},
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
