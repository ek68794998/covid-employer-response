import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerActionLinks from "./EmployerActionLinks";

describe("<EmployerActionLinks />", () => {
	test("renders without exploding", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerActionLinks employer={new EmployerRecordMetadata(0, 0, 0, "fair")} />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});

	test("properly shows all action links", async () => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const record: EmployerRecordMetadata =
			Object.assign(new EmployerRecordMetadata(0, 0, 0, "fair"), {
				id: "e1",
				name: "Alpha",
				officialWebsite: "http://example.com",
				wiki: "Example",
			});

		const renderedValue: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerActionLinks employer={record} />
					</BrowserRouter>
				</Provider>,
			);

		expect(renderedValue.toJSON()).toMatchSnapshot();
	});
});
