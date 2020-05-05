import React from "react";
import * as ReactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";

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

jest.mock(
	"../LoadingIndicator/LoadingIndicator",
	() => mockComponent("LoadingIndicator"));

describe("<EmployerPage />", () => {
	beforeEach(() => {
		jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(jest.fn());
	});

	afterEach(() => {
		(ReactRedux.useDispatch as any).mockRestore();
	});

	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<ReactRedux.Provider store={store}>
					<BrowserRouter>
						<EmployerPage employerId="foo" />
					</BrowserRouter>
				</ReactRedux.Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("displays an employer record", async () => {
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
					[fakeEmployer.id as string]: Object.assign(new EmployerRecordMetadata(0, 0, 0, "fair"), fakeEmployer),
				},
			},
			strings: await getPlocStringsAsync(),
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<ReactRedux.Provider store={store}>
					<BrowserRouter>
						<EmployerPage employerId={fakeEmployer.id || ""} />
					</BrowserRouter>
				</ReactRedux.Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
