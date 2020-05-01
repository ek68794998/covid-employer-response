import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				appTitle: ploc("appTitle"),
				appTitleShort: ploc("app"),
				home: ploc("home"),
				homeFormLink: ploc("homeFormLink"),
				homeListLink: ploc("homeListLink"),
				homeSampleDescription: ploc("homeSampleDescription"),
				homeSampleTitle: ploc("homeSampleTitle"),
				homeSubmitDescription: ploc("homeSubmitDescription"),
				homeSubmitTitle: ploc("homeSubmitTitle"),
				homeSubtitleText: ploc("homeSubtitleText"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<HomePage />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
