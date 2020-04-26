import React from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { ProjectUrl } from "../../../common/constants/UrlConstants";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./AboutPage.scss";

const AboutPage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const coronavirusWikipediaUrl: string = "https://en.wikipedia.org/wiki/Coronavirus_disease_2019";
	const coronavirusPandemicWikipediaUrl: string = "https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic";

	return (
		<main id="about">
			<Helmet>
				<title>{strings.about} | {strings.appTitle}</title>
			</Helmet>
			<div className="AboutPage__Content">
				<h2 id="what-is">{format(strings.aboutSectionHeaders.whatIs, { app: strings.appTitleShort })}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={(
						format(
							strings.aboutSectionParagraphs.whatIs,
							{
								app: strings.appTitleShort,
								appFullName: strings.appTitle,
								covidWikiUrl: coronavirusWikipediaUrl,
								githubUrl: ProjectUrl,
								pandemicWikiUrl: coronavirusPandemicWikipediaUrl,
							})
					)}
				/>

				<h2 id="contributing">{strings.aboutSectionHeaders.contributing}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={(
						format(
							strings.aboutSectionParagraphs.contributing,
							{
								app: strings.appTitleShort,
								githubUrl: ProjectUrl,
							})
					)}
				/>

				<h2 id="reports-and-claims">{strings.aboutSectionHeaders.reportsAndClaims}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={strings.aboutSectionParagraphs.reportsAndClaims}
				/>

				<h2 id="claim-processing">{strings.aboutSectionHeaders.claimProcessing}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={strings.aboutSectionParagraphs.claimProcessing}
				/>

				<h2 id="submit-claims">{strings.aboutSectionHeaders.submitClaims}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={(
						format(
							strings.aboutSectionParagraphs.submitClaims,
							{
								submit: strings.submit,
							})
					)}
				/>

				<h2 id="citation-types">{strings.aboutSectionHeaders.citationTypes}</h2>
				<ReactMarkdown
					className="AboutPage__CitationTypes"
					linkTarget="_blank"
					source={(
						format(
							strings.aboutSectionParagraphs.citationTypes,
							{
								hearsay: strings.citationTypes.hearsay,
								hearsayDescription: strings.citationTypeDescriptions.hearsay,
								publication: `${strings.citationTypes.publication}`,
								publicationDescription: strings.citationTypeDescriptions.publication,
								statement: strings.citationTypes.statement,
								statementDescription: strings.citationTypeDescriptions.statement,
							})
					)}
				/>

				<h2 id="employer-ratings">{strings.aboutSectionHeaders.employerRatings}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={strings.aboutSectionParagraphs.employerRatings}
				/>

				<h2 id="layoffs-and-furloughs">{strings.aboutSectionHeaders.layoffsAndFurloughs}</h2>
				<ReactMarkdown
					linkTarget="_blank"
					source={strings.aboutSectionParagraphs.layoffsAndFurloughs}
				/>
			</div>
		</main>
	);
};

export default withRouter(AboutPage);
