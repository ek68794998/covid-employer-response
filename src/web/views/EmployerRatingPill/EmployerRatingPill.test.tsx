import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerRatingPill from "./EmployerRatingPill";

describe("<EmployerRatingPill />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				detailDescriptions: {
					rating: ploc("rating"),
				},
				ratingLabels: {
					fair: ploc("fair"),
					good: ploc("good"),
					poor: ploc("poor"),
				},
			},
		});

		const employer: EmployerRecordMetadata =
			new EmployerRecordMetadata(3, 1, "good");

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRatingPill employer={employer} isAnnotated={true} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
