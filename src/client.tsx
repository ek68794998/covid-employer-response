/* istanbul ignore file */
/*
  No test coverage since testing module hydration is not really feasible.
  Please keep as much logic out of this as possible.
*/

import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import App from "./web/App";
import { AppState } from "./web/state/AppState";
import configureStore from "./web/state/configureStore";

const store: Store<AppState, AnyAction> = configureStore((window as any).__PRELOADED_STATE__);

hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);

if (module.hot) {
	module.hot.accept();
}
