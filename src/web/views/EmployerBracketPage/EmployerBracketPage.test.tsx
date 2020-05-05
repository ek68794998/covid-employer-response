import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerRouteContext, DefaultContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployerBracketPage from "./EmployerBracketPage";

jest.mock(
	"../EmployerBracketList/EmployerBracketList",
	() => mockComponent("EmployerBracketList"));

jest.mock(
	"../LoadingIndicator/LoadingIndicator",
	() => mockComponent("LoadingIndicator"));

describe("<EmployerBracketPage />", () => {
	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerBracketPage mode="ranking" />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
