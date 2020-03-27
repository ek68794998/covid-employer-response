import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderMenu.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	return (
		<header>
			<div className="header-container">
				<div id="brand">
					{strings.appTitle}
				</div>
				<ul id="menu">
					<li><Link to="/">{strings.home}</Link></li>
					<li><Link to="/about">{strings.about}</Link></li>
				</ul>
			</div>
		</header>
	);
};

export default withRouter(HeaderMenu) as any;
