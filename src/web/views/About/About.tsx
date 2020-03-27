import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./About.scss";

const About: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const githubUrl: string = "https://github.com/ekumlin/covid-employer-response";

	return (
		<main id="about">
			<Helmet>
				<title>{strings.about}</title>
			</Helmet>
			<div className="content">
				<a href={githubUrl}>GitHub</a>
			</div>
		</main>
	);
};

export default withRouter(About) as any;
