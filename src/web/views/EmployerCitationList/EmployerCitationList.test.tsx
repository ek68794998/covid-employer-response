import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { Citation } from "../../../common/Citation";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerCitationList from "./EmployerCitationList";

describe("<EmployerCitationList />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				citationTypeDescriptions: {
					hearsay: "hearsay desc value",
					publication: "publication desc value",
					statement: "statement desc value",
				},
				citationTypes: {
					hearsay: "hearsay value",
					publication: "publication value",
					statement: "statement value",
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerCitationList
							citations={[ new Citation() ]}
							citationSourceBase={0}
							citationType={"publication"}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
