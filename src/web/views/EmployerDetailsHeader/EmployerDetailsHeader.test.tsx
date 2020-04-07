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
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
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
});
