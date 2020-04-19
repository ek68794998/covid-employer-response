import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import AboutPage from "./AboutPage";

jest.mock(
	"react-markdown",
	() => mockComponent("ReactMarkdown"));

describe("<AboutPage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: ploc("about"),
				aboutSectionHeaders: {
					citationTypes: ploc("citationTypesHeader"),
					claimProcessing: ploc("claimProcessingHeader"),
					contributing: ploc("contributingHeader"),
					employerRatings: ploc("employerRatingsHeader"),
					reportsAndClaims: ploc("reportsAndClaimsHeader"),
					submitClaims: ploc("submitClaimsHeader"),
					whatIs: `${ploc("whatIsHeader")}: {app}`,
				},
				aboutSectionParagraphs: {
					citationTypes: `${ploc("citationTypesParagraph")}: {publication} / {statement} / {hearsay}; {publicationDescription} / {statementDescription} / {hearsayDescription}`,
					claimProcessing: ploc("claimProcessingParagraph"),
					contributing: `${ploc("contributingParagraph")}: {app} / {githubUrl}`,
					employerRatings: ploc("employerRatingsParagraph"),
					reportsAndClaims: ploc("reportsAndClaimsParagraph"),
					submitClaims: `${ploc("submitClaimsParagraph")}: {submit}`,
					whatIs: `${ploc("whatIsParagraph")}: {app} / {appFullName} / {covidWikiUrl} / {githubUrl} / {pandemicWikiUrl}`,
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
