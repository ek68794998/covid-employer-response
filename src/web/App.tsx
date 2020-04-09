import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getEmployersList } from "./state/ducks/employers/actions";
import AboutPage from "./views/AboutPage/AboutPage";
import EmployerListPage from "./views/EmployerListPage/EmployerListPage";
import EmployerPage from "./views/EmployerPage/EmployerPage";
import FooterMenu from "./views/HeaderFooter/FooterMenu";
import HeaderMenu from "./views/HeaderFooter/HeaderMenu";
import HomePage from "./views/HomePage/HomePage";

import "./App.scss";

const App: React.FC = (): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	useEffect(
		() => {
			dispatch(getEmployersList);
		},
		[]);

	return (
		<>
			<HeaderMenu />
			<Switch>
				<Route exact={true} path="/" component={/* TODO Switch to HomePage */ EmployerListPage} />
				<Route exact={true} path="/employers" component={EmployerListPage} />
				<Route exact={true} path="/employers/:id" component={EmployerPage} />
				<Route path="/about" component={AboutPage} />
			</Switch>
			<FooterMenu />
		</>
	);
};

export default App;