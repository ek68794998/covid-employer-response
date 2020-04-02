import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import App from "./App";

import configureStore from "./state/configureStore";

describe("<App />", () => {
	test("renders without exploding", () => {
		const div: HTMLDivElement = document.createElement("div");
		const store: Store<{}, AnyAction> = configureStore({
			strings: {
				about: "About",
				appTitle: "Test App",
				home: "Home",
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
