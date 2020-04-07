import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./views/About/About";
import FooterMenu from "./views/HeaderFooter/FooterMenu";
import HeaderMenu from "./views/HeaderFooter/HeaderMenu";
import Home from "./views/Home/Home";

import "./App.scss";

const App: React.FC = (): React.ReactElement => (
	<>
		<HeaderMenu />
		<Switch>
			<Route exact={true} path="/" component={Home} />
			<Route path="/about" component={About} />
		</Switch>
		<FooterMenu />
	</>
);

export default App;