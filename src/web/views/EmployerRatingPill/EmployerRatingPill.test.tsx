import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerRatingPill from "./EmployerRatingPill";

describe("<EmployerRatingPill />", () => {
	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const employer: EmployerRecordMetadata =
			new EmployerRecordMetadata(3, 1, 0, "good");

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
