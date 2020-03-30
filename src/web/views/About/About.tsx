import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./About.scss";

const About: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const coronavirusWikipediaUrl: string = "https://en.wikipedia.org/wiki/Coronavirus_disease_2019";
	const coronavirusPandemicWikipediaUrl: string = "https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic";

	return (
		<main id="about">
			<Helmet>
				<title>{strings.about} | {strings.appTitle}</title>
			</Helmet>
			<div className="content">
				<h2>What is {strings.appTitleShort}?</h2>
				<p>
					<strong>{strings.appTitleShort}</strong> ({strings.appTitle}) is a collaborative, open-source project designed to
					track the responses of employers to the <a href={coronavirusWikipediaUrl} target="_blank">coronavirus</a>
					&nbsp;(COVID-19) <a href={coronavirusPandemicWikipediaUrl} target="_blank">pandemic of 2019&ndash;2020</a>. It is
					built using information sourced from a number of places and categorizes it based on how reliable the original
					information source is considered to be.
				</p>
				<p>
					For more information on the project, or to contribute, please visit&nbsp;
					<a href={ProjectUrl} target="_blank">the project's page on GitHub</a>.
				</p>

				<h2>What are employer reports and claims?</h2>
				<p>
					TODO
				</p>

				<h2>How do employer claims get processed?</h2>
				<p>
					TODO
				</p>

				<h2>What determines the rating of a company?</h2>
				<p>
					TODO
				</p>

				<h2>How do I submit, change, or dispute a claim?</h2>
				<p>
					TODO
				</p>

				<h2>
					What is the difference between "{strings.citationTypes.publication}", "{strings.citationTypes.statement}",
					and "{strings.citationTypes.hearsay}"?</h2>
				<p>
					TODO
				</p>
			</div>
		</main>
	);
};

export default withRouter(About) as any;
