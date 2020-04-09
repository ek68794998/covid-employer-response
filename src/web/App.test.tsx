import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import { ploc } from "../__tests__/TestUtils";

import App from "./App";
import { AppState } from "./state/AppState";
import configureStore from "./state/configureStore";

describe("<App />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: ploc("about"),
				appTitle: ploc("appTitle"),
				employerList: ploc("employerList"),
				home: ploc("home"),
			},
		});

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
