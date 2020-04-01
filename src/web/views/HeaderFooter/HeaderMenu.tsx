import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectIssueSubmissionUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	return (
		<header>
			<div className="container">
				<div id="brand">
					<NavLink to="/">{strings.appTitleShort}</NavLink>
					<div className="brand-large">{strings.appTitle}</div>
				</div>
				<NavLink exact={true} className="menu-link" to="/">{strings.home}</NavLink>
				<NavLink exact={true} className="menu-link" to="/about">{strings.about}</NavLink>
				<a className="menu-link" href={`${ProjectIssueSubmissionUrl}`} target="_blank">{strings.submit}</a>
			</div>
		</header>
	);
};

export default HeaderMenu as any;
