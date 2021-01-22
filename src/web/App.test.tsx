import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../__tests__/TestUtils";

import App from "./App";
import { AppState } from "./state/AppState";
import configureStore from "./state/configureStore";

jest.mock(
	"./views/HomePage/HomePage",
	(): any => mockComponent("HomePage"));

jest.mock(
	"./views/EmployerRoute/EmployerRoute",
	(): any => mockComponent("EmployerRoute"));

jest.mock(
	"./views/AboutPage/AboutPage",
	(): any => mockComponent("AboutPage"));

jest.mock(
	"./views/SubmitPage/SubmitPage",
	(): any => mockComponent("SubmitPage"));

describe("<App />", (): void => {
	test("renders without exploding", (): void => {
		const div: HTMLDivElement = document.createElement("div");
		const store: Store<AppState, AnyAction> = configureStore({});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>,
			div,
		);
	});
});
