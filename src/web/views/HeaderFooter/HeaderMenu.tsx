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
					<Link to="/">{strings.appTitleShort}</Link>
					<div className="brand-large">{strings.appTitle}</div>
				</div>
				<div className="menu-link"><Link to="/">{strings.home}</Link></div>
				<div className="menu-link"><Link to="/about">{strings.about}</Link></div>
			</div>
		</header>
	);
};

export default withRouter(HeaderMenu) as any;
