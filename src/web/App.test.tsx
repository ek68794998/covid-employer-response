import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import App from "./App";
import { AppState } from "./state/AppState";
import configureStore from "./state/configureStore";

describe("<App />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				about: "áβôúƭ",
				appTitle: "áƥƥTïƭℓè",
				home: "λô₥è",
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
