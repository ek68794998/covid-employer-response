import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { ploc } from "../../../__tests__/TestUtils";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerActionLinks from "./EmployerActionLinks";

describe("<EmployerActionLinks />", () => {
	const createConfigStore = (): Store<AppState, AnyAction> =>
		configureStore({
			strings: {
				detailDescriptions: {
					edit: ploc("editDescription"),
					linkToEmployer: ploc("linkToEmployer"),
					officialWebsite: ploc("officialWebsiteDescription"),
					wikipedia: ploc("wikipediaDescription"),
				},
			},
		});

	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerActionLinks employer={new EmployerRecordMetadata(0, 0, "fair")} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	test("properly shows all action links", () => {
		const store: Store<AppState, AnyAction> = createConfigStore();

		const record: EmployerRecordMetadata =
			Object.assign(new EmployerRecordMetadata(0, 0, "fair"), {
				id: "e1",
				name: "Alpha",
				officialWebsite: "http://example.com",
				wiki: "Example",
			});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerActionLinks employer={record} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
