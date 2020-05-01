import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import SubmitPage from "./SubmitPage";

jest.mock(
	"react-markdown",
	() => mockComponent("ReactMarkdown"));

describe("<SubmitPage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				appTitle: ploc("appTitle"),
				submit: ploc("submit"),
				submitCodeGithub: {
					description: ploc("submitCodeGithub.description"),
					title: ploc("submitCodeGithub.title"),
				},
				submitDataForm: {
					description: ploc("submitDataForm.description"),
					title: ploc("submitDataForm.title"),
				},
				submitDataGithub: {
					description: ploc("submitDataGithub.description"),
					title: ploc("submitDataGithub.title"),
				},
				submitSubtitle: ploc("submitSubtitle"),
				submitTitle: ploc("submitTitle"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<SubmitPage />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
