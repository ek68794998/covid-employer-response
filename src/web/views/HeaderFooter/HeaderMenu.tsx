import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderMenu.scss";

interface HeaderMenuProps {
	strings: LocalizedStrings;
}

const HeaderMenu: React.FC<HeaderMenuProps> = (props: HeaderMenuProps): React.ReactElement => {
	const { strings } = props;

	return (
		<header>
			<div className="header-container">
				<div id="brand">
					Coronavirus Employer Response Tracker
				</div>
				<ul id="menu">
					<li><Link to="/">{strings.home}</Link></li>
				</ul>
			</div>
		</header>
	);
};

const mapStateToProps = (state: AppState, ownProps: HeaderMenuProps): HeaderMenuProps => ({
	...ownProps,
	strings: getStrings(state),
});

export default withRouter(connect(
	mapStateToProps,
)(HeaderMenu) as any);
