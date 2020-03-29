import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./views/About/About";
import FooterMenu from "./views/HeaderFooter/FooterMenu";
import HeaderMenu from "./views/HeaderFooter/HeaderMenu";
import Home from "./views/Home/Home";

import "./App.scss";

export default (): JSX.Element => (
	<React.Fragment>
		<HeaderMenu />
		<Switch>
			<Route exact={true} path="/" component={Home} />
			<Route path="/about" component={About} />
		</Switch>
		<FooterMenu />
	</React.Fragment>
);