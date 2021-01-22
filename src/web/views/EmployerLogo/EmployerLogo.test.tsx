import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerLogo from "./EmployerLogo";

describe("<EmployerLogo />", (): void => {
	test("renders without exploding", (): void => {
		const store: Store<AppState, AnyAction> = configureStore({});

		const employer: EmployerRecord = {
			...new EmployerRecord(),
			image: "test.svg#123",
		};

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerLogo employer={employer} />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
