import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";

import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordBase } from "../../../common/EmployerRecordBase";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPage from "./EmployerPage";

jest.mock(
	"../EmployerPageDetails/EmployerPageDetails",
	() => mockComponent("EmployerPageDetails"));

describe("<EmployerPage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				appTitle: ploc("appTitle"),
				home: ploc("home"),
				loading: ploc("loading"),
				notFound: ploc("notFound"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPage employerId="foo" />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("displays an employer record", () => {
		const fakeEmployer: Partial<EmployerRecordBase> = {
			employeesBefore: new EmployerEmployeeProfile(),
			id: "e1",
			location: new EmployerLocation(),
			name: "Alpha",
		};

		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsComplete: {
					[fakeEmployer.id as string]: Object.assign(new EmployerRecord(), fakeEmployer),
				},
				itemsMetadata: {
					[fakeEmployer.id as string]: Object.assign(new EmployerRecordMetadata(0, 0, "fair"), fakeEmployer),
				},
			},
			strings: {
				appTitle: ploc("appTitle"),
				home: ploc("home"),
				loading: ploc("loading"),
				notFound: ploc("notFound"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPage employerId={fakeEmployer.id || ""} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
