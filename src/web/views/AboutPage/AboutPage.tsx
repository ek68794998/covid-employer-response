/* eslint-disable max-len */
/* The max-len detection in ESLint is not as good as TSLint so it doesn't work well with this file. */

import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { format, LocalizedStrings } from "../../../common/LocalizedStrings";

import "./AboutPage.scss";

const AboutPage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const coronavirusWikipediaUrl: string = "https://en.wikipedia.org/wiki/Coronavirus_disease_2019";
	const coronavirusPandemicWikipediaUrl: string = "https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic";

	const makeExternalLink = (url: string, text: string): JSX.Element =>
		<a href={url} rel="noopener noreferrer" target="_blank">{text}</a>;

	return (
		<main id="about">
			<Helmet>
				<title>{strings.about} | {strings.appTitle}</title>
			</Helmet>
			<div className="AboutPage__Content">
				<h2 id="what-is">{format(strings.aboutSectionHeaders.whatIs, { app: strings.appTitleShort })}</h2>
				<p>
					<strong>{strings.appTitleShort}</strong> ({strings.appTitle}) is a collaborative, open-source project designed to
					track the responses of employers to the {makeExternalLink(coronavirusWikipediaUrl, "coronavirus")}
					&nbsp;(COVID-19) {makeExternalLink(coronavirusPandemicWikipediaUrl, `pandemic of 2019${String.fromCharCode(8211)}2020`)}. It is
					built using information sourced from a number of places and categorizes it based on how reliable the original
					information source is considered to be. For more information, please visit&nbsp;
					{makeExternalLink(ProjectUrl, "the project's page on GitHub")}.
				</p>

				<h2 id="contributing">{strings.aboutSectionHeaders.contributing}</h2>
				<p>
					Yes! {strings.appTitleShort} is open-source and open-data and we'd love to have your help! You can help by
					submitting new employer claims and changes, or by submitting code changes to the site through&nbsp;
					{makeExternalLink(ProjectUrl, "GitHub")}.
				</p>

				<h2 id="reports-and-claims">{strings.aboutSectionHeaders.reportsAndClaims}</h2>
				<p>
					An <strong>employer claim</strong> is one or more declarations about an employer which include a summary and
					citations to back it up. This appears as a single bullet-point in the employer's listing beneath a header
					such as "{strings.citationTypes.publication}".
				</p>
				<p>
					An <strong>employer report</strong> is a collection of claims about an employer as well as an overall rating
					of how well that employer has handled the COVID-19 pandemic crisis.
				</p>

				<h2 id="claim-processing">{strings.aboutSectionHeaders.claimProcessing}</h2>
				<p>
					Once a claim is submitted, it must be reviewed by a contributor to the project before it will be approved and
					appear on the site. This review process will require the contributor to go through each of the sources and validate
					that the claim made is substantiated by the source. Once the submitter and contributor(s) agree on the submitted
					information, the claim is completed and will appear the next time the site is updated.
				</p>

				<h2 id="submit-claims">{strings.aboutSectionHeaders.submitClaims}</h2>
				<p>
					To submit a claim change of any kind, please click the "{strings.submit}" link in the navigation menu. From there,
					you can either submit a request for someone to update our data files, or submit a GitHub pull request to update
					the files yourself.
				</p>

				<h2 id="citation-types">
					{format(
						strings.aboutSectionHeaders.citationTypes,
						{
							hearsay: strings.citationTypes.hearsay,
							publication: strings.citationTypes.publication,
							statement: strings.citationTypes.statement,
						})}
				</h2>
				<ul>
					<li>{strings.citationTypes.publication}: {strings.citationTypeDescriptions.publication}</li>
					<li>{strings.citationTypes.statement}: {strings.citationTypeDescriptions.statement}</li>
					<li>{strings.citationTypes.hearsay}: {strings.citationTypeDescriptions.hearsay}</li>
				</ul>

				<h2 id="employer-ratings">{strings.aboutSectionHeaders.employerRatings}</h2>
				<p>
					Ratings are algorithmically determined based on the positivity and negativity of the claims that it has. Claims
					that are more safety-critical have a higher weight than those which are not, and thus are not factored as heavily.
				</p>
			</div>
		</main>
	);
};

export default withRouter(AboutPage);
