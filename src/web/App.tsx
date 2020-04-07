import React from "react";
import { Route, Switch } from "react-router-dom";

import AboutPage from "./views/AboutPage/AboutPage";
import EmployerListPage from "./views/EmployerListPage/EmployerListPage";
import FooterMenu from "./views/HeaderFooter/FooterMenu";
import HeaderMenu from "./views/HeaderFooter/HeaderMenu";
import HomePage from "./views/HomePage/HomePage";

import "./App.scss";

const App: React.FC = (): React.ReactElement => (
	<>
		<HeaderMenu />
		<Switch>
			<Route exact={true} path="/" component={HomePage} />
			<Route path="/employers" component={EmployerListPage} />
			<Route path="/about" component={AboutPage} />
		</Switch>
		<FooterMenu />
	</>
);

export default App;