import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { AppState } from "../../../state/AppState";
import configureStore from "../../../state/configureStore";

import EmployerListFilterControl from "./EmployerListFilterControl";

describe("<EmployerListFilterControl />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListFilterControl
							getDisplayText={(): string => "δïƨƥℓá¥Tèжƭ"}
							isActive={true}
							onClear={(): void => { /* Do nothing. */ }}
							popupTitle="ƭïƭℓèTèжƭ"
							selectorPropsList={[]}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
