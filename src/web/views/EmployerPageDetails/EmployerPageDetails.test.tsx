import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPageDetails from "./EmployerPageDetails";

describe("<EmployerPageDetails />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				detailDescriptions: {
					edit: "edit string",
					employees: "employees string",
					location: "location string",
					officialWebsite: "officialWebsite string",
					rating: "rating string",
					wikipedia: "wikipedia string",
				},
				ratingLabels: {
					fair: "fair string",
					good: "good string",
					poor: "poor string",
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
});