import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerRouteContext, DefaultContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployerBracketList from "./EmployerBracketList";

jest.mock(
	"../EmployerListItem/EmployerListItem",
	() => mockComponent("EmployerListItem"));

describe("<EmployerList />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerBracketList employers={[]} metric="rating" title="Title" />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
