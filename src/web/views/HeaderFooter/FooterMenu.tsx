import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { AuthorUrl, ProjectUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	return (
		<footer>
			<div className="container">
				<span id="maintained-by">
					Maintained by <a href={AuthorUrl}>Eric Kumlin</a>
				</span>
				<span id="project-source">
					<em>{strings.appTitle}</em> is open-source and open-data, hosted on <a href={ProjectUrl}>GitHub</a>.
				</span>
			</div>
		</footer>
	);
};

export default withRouter(HeaderMenu) as any;