import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../../state/AppState";
import configureStore from "../../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearchFilter";

import InternationalTypeFilterControl from "./InternationalTypeFilterControl";

describe("<InternationalTypeFilterControl />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				filters: {
					locationDefault: "ℓôçáƭïôñÐèƒáúℓƭ",
					locationInternational: "ℓôçáƭïôñÌñƭèřñáƭïôñáℓ",
					locationNational: "ℓôçáƭïôñNáƭïôñáℓ",
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<InternationalTypeFilterControl
							filter={new EmployerListSearchFilter()}
							onUpdateFilter={(): void => { /* Do nothing. */ }}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
