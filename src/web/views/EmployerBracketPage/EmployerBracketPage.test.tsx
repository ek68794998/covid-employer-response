import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerRouteContext, DefaultContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployerBracketPage from "./EmployerBracketPage";

jest.mock(
	"../EmployerBracketList/EmployerBracketList",
	(): any => mockComponent("EmployerBracketList"));

jest.mock(
	"../LoadingIndicator/LoadingIndicator",
	(): any => mockComponent("LoadingIndicator"));

describe("<EmployerBracketPage />", (): void => {
	test("renders without exploding", async (): Promise<void> => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerBracketPage mode="ranking" />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
