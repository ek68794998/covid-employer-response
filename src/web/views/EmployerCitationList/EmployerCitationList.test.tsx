import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { Citation } from "../../../common/Citation";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerCitationList from "./EmployerCitationList";

jest.mock(
	"../EmployerCitation/EmployerCitation",
	() => mockComponent("EmployerCitation"));

describe("<EmployerCitationList />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				citationTypeDescriptions: {
					hearsay: ploc("hearsayDescription"),
					publication: ploc("publicationDescription"),
					statement: ploc("statementDescription"),
				},
				citationTypes: {
					hearsay: ploc("hearsay"),
					publication: ploc("publication"),
					statement: ploc("statement"),
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerCitationList citations={[ new Citation() ]} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
