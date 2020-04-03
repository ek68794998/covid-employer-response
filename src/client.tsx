/* istanbul ignore file */
/*
  No test coverage since testing module hydration is not really feasible.
  Please keep as much logic out of this as possible.
*/

import React from "react";
import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import App from "./web/App";
import configureStore from "./web/state/configureStore";

const store: Store<{}, AnyAction> = configureStore((window as any).__PRELOADED_STATE__);

Modal.setAppElement("#root");

hydrate(
	<Provider store={store}>
		<HelmetProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</Provider>,
	document.getElementById("root"),
);

if (module.hot) {
	module.hot.accept();
}
