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
			<div className="About__Content">
				<h2 id="what-is">What is {strings.appTitleShort}?</h2>
				<p>
					<strong>{strings.appTitleShort}</strong> ({strings.appTitle}) is a collaborative, open-source project designed to
					track the responses of employers to the <a href={coronavirusWikipediaUrl} target="_blank">coronavirus</a>
					&nbsp;(COVID-19) <a href={coronavirusPandemicWikipediaUrl} target="_blank">pandemic of 2019&ndash;2020</a>. It is
					built using information sourced from a number of places and categorizes it based on how reliable the original
					information source is considered to be. For more information, please visit&nbsp;
					<a href={ProjectUrl} target="_blank">the project's page on GitHub</a>.
				</p>

				<h2 id="contributing">Can I help?</h2>
				<p>
					Yes! {strings.appTitleShort} is open-source and open-data and we'd love to have your help! You can help by
					submitting new employer claims and changes, or by submitting code changes to the site through&nbsp;
					<a href={ProjectUrl} target="_blank">GitHub</a>.
				</p>

				<h2 id="reports-and-claims">What are employer claims and reports?</h2>
				<p>
					An <strong>employer claim</strong> is one or more declarations about an employer which include a summary and
					citations to back it up. This appears as a single bullet-point in the employer's listing beneath a header
					such as "{strings.citationTypes.publication}".
				</p>
				<p>
					An <strong>employer report</strong> is a collection of claims about an employer as well as an overall rating
					of how well that employer has handled the COVID-19 pandemic crisis.
				</p>

				<h2 id="claim-processing">How do claims get processed?</h2>
				<p>
					Once a claim is submitted, it must be reviewed by a contributor to the project before it will be approved and
					appear on the site. This review process will require the contributor to go through each of the sources and validate
					that the claim made is substantiated by the source. Once the submitter and contributor(s) agree on the submitted
					information, the claim is completed and will appear the next time the site is updated.
				</p>

				<h2 id="submit-claims">How do I add, change, or dispute claims?</h2>
				<p>
					To submit a claim change of any kind, please click the "{strings.submit}" link in the navigation menu. From there,
					you can either submit a request for someone to update our data files, or submit a GitHub pull request to update
					the files yourself.
				</p>

				<h2 id="citation-types">
					What is the difference between "{strings.citationTypes.publication}", "{strings.citationTypes.statement}",
					and "{strings.citationTypes.hearsay}"?
				</h2>
				<ul>
					<li>{strings.citationTypes.publication}: {strings.citationTypeDescriptions.publication}</li>
					<li>{strings.citationTypes.statement}: {strings.citationTypeDescriptions.statement}</li>
					<li>{strings.citationTypes.hearsay}: {strings.citationTypeDescriptions.hearsay}</li>
				</ul>

				<h2 id="employer-ratings">What determines the rating of an employer?</h2>
				<p>
					Ratings are algorithmically determined based on the positivity and negativity of the claims that it has. Claims
					that are more safety-critical have a higher weight than those which are not, and thus are not factored as heavily.
				</p>
			</div>
		</main>
	);
};

export default withRouter(About) as any;
