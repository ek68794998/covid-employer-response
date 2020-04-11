import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import AboutPage from "./AboutPage";

describe("<AboutPage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: ploc("about"),
				aboutSectionHeaders: {
					citationTypes: `${ploc("citationTypesHeader")}: {publication} / {statement} / {hearsay}`,
					claimProcessing: ploc("claimProcessingHeader"),
					contributing: ploc("contributingHeader"),
					employerRatings: ploc("employerRatingsHeader"),
					reportsAndClaims: ploc("reportsAndClaimsHeader"),
					submitClaims: ploc("submitClaimsHeader"),
					whatIs: `${ploc("whatIsHeader")}: {app}`,
				},
				appTitle: ploc("appTitle"),
				appTitleShort: ploc("app"),
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
				submit: ploc("submit"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<AboutPage />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
