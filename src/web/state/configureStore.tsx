import { AnyAction, applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { Production } from "../../common/constants/EnvironmentConstants";

import { AppState } from "./AppState";
import rootReducer from "./ducks";

const configureStore = (preloadedState: Partial<AppState>): Store<AppState, AnyAction> => {
	const isProd: boolean = process.env.NODE_ENV === Production;
	const composeEnhancers: any =
		(!isProd && typeof window !== "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store: Store<AppState, AnyAction> = createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(applyMiddleware(thunk)),
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./ducks", () => {
			const nextRootReducer: any = require("./ducks").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};

export default configureStore;