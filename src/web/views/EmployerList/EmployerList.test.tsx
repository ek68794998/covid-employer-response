import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent } from "../../../__tests__/TestUtils";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import EmployerList from "./EmployerList";

jest.mock(
	"../EmployerListDetails/EmployerListDetails",
	() => mockComponent("EmployerListDetails"));

jest.mock(
	"../EmployerPageDetails/EmployerPageDetails",
	() => mockComponent("EmployerPageDetails"));

describe("<EmployerList />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				loading: "ℓôáδïñϱ",
				noResults: "ñôRèƨúℓƭƨ",
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerList
							employers={[ new EmployerRecord() ]}
							searchFilter={new EmployerListSearchFilter()}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
