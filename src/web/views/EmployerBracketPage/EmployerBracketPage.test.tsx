import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

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
	const strings: LocalizedStrings = {
		employerListRankingBestTitle: ploc("employerListRankingBestTitle"),
		employerListRankingWorstTitle: ploc("employerListRankingWorstTitle"),
		employerListRecentTitle: ploc("employerListRecentTitle"),
	};

	const createConfigStore = (): Store<AppState, AnyAction> => configureStore({ strings });

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

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
