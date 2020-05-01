import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getEmployersList } from "./state/ducks/employers/actions";
import AboutPage from "./views/AboutPage/AboutPage";
import EmployerRoute from "./views/EmployerRoute/EmployerRoute";
import FooterMenu from "./views/HeaderFooter/FooterMenu";
import HeaderMenu from "./views/HeaderFooter/HeaderMenu";
import HomePage from "./views/HomePage/HomePage";
import Overload from "./views/Overload/Overload";
import SubmitPage from "./views/SubmitPage/SubmitPage";

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
			<Overload />
			<HeaderMenu />
			<Switch>
				<Route exact={true} path="/" component={HomePage} />
				<Route path="/employers/:id?" component={EmployerRoute} />
				<Route path="/about" component={AboutPage} />
				<Route path="/submit" component={SubmitPage} />
			</Switch>
			<FooterMenu />
		</>
	);
};

export default App;
