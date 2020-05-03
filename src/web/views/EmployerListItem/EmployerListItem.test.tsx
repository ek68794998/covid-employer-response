import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { mockComponent, ploc } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListItem from "./EmployerListItem";

jest.mock(
	"../EmployerDetailsHeader/EmployerDetailsHeader",
	() => mockComponent("EmployerDetailsHeader"));

jest.mock(
	"../EmployerActionLinks/EmployerActionLinks",
	() => mockComponent("EmployerActionLinks"));

describe("<EmployerListItem />", () => {
	test("renders standard without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsMetadata: {
					foo: new EmployerRecordMetadata(0, 0, 0, "fair"),
				},
			},
			strings: {
				ratingLabels: {
					fair: ploc("fair"),
					good: ploc("good"),
					poor: ploc("poor"),
				},
				readMore: ploc("readMore"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListItem
							employerId={"foo"}
							metric="rating"
							showDetails={false}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("renders details without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			employers: {
				itemsMetadata: {
					foo: new EmployerRecordMetadata(0, 0, 0, "fair"),
				},
			},
			strings: {
				readMore: ploc("readMore"),
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListItem
							employerId={"foo"}
							metric="rating"
							showDetails={true}
						/>
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
