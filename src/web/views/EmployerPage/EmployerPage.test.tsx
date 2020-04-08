import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";

import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerPage from "./EmployerPage";

jest.mock(
	"../EmployerPageDetails/EmployerPageDetails",
	() => mockComponent("EmployerPageDetails"));

describe("<EmployerPage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				appTitle: ploc("appTitle"),
				home: ploc("home"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPage
							history={{} as any}
							location={{} as any}
							match={{
								isExact: true,
								params: { id: "foo" },
								path: "/employers",
								url: "//notused",
							}}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("displays an employer record", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsComplete: {
					e1: Object.assign(new EmployerRecord(), {
						employeesBefore: new EmployerEmployeeProfile(),
						id: "e1",
						location: new EmployerLocation(),
						name: "Alpha",
					}),
				},
			},
			strings: {
				appTitle: ploc("appTitle"),
				home: ploc("home"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerPage
							history={{} as any}
							location={{} as any}
							match={{
								isExact: true,
								params: { id: "e1" },
								path: "/employers",
								url: "//notused",
							}}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
