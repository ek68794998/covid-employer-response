import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectIssueSubmissionUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	return (
		<header>
			<div className="HeaderFooter__Container">
				<div id="brand">
					<NavLink to="/">{strings.appTitleShort}</NavLink>
					<div className="HeaderMenu__BrandLarge">{strings.appTitle}</div>
				</div>
				<NavLink exact={true} className="HeaderMenu__Link" to="/">{strings.home}</NavLink>
				<NavLink exact={true} className="HeaderMenu__Link" to="/about">{strings.about}</NavLink>
				<a className="HeaderMenu__Link" href={`${ProjectIssueSubmissionUrl}`} target="_blank">{strings.submit}</a>
			</div>
		</header>
	);
};

export default HeaderMenu;
