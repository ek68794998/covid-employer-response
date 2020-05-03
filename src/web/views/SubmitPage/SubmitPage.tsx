import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { ProjectIssueSubmissionUrl, ProjectUrl, SubmissionFormUrl } from "../../../common/constants/UrlConstants";

import { getStrings } from "../../state/ducks/localization/selectors";

import AppHelmet from "../AppHelmet/AppHelmet";

import "./SubmitPage.scss";

const SubmitPage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	return (
		<main id="submit">
			<AppHelmet
				title={strings.submit}
			/>
			<div className="SubmitPage__Container">
				<div className="SubmitPage__Content">
					<h1>{strings.submitTitle}</h1>
					<ReactMarkdown source={format(strings.submitSubtitle, { appTitle: strings.appTitle })} />
					<section className="SubmitPage__Options">
						<a
							className="SubmitPage__Option SubmitPage__Option--DataForm"
							href={SubmissionFormUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							<h2>{strings.submitDataForm.title}</h2>
							<ReactMarkdown source={strings.submitDataForm.description} />
							<div className="SubmitPage__OptionIcon"><img src="/images/google-forms.svg" /></div>
						</a>
						<div className="SubmitPage__Spacer" />
						<a
							className="SubmitPage__Option SubmitPage__Option--DataGitHub"
							href={ProjectIssueSubmissionUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							<h2>{strings.submitDataGithub.title}</h2>
							<ReactMarkdown source={strings.submitDataGithub.description} />
							<div className="SubmitPage__OptionIcon"><img src="/images/github.svg" /></div>
						</a>
						<div className="SubmitPage__Spacer" />
						<a
							className="SubmitPage__Option SubmitPage__Option--CodeGitHub"
							href={ProjectUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							<h2>{strings.submitCodeGithub.title}</h2>
							<ReactMarkdown source={strings.submitCodeGithub.description} />
							<div className="SubmitPage__OptionIcon"><img src="/images/github.svg" /></div>
						</a>
					</section>
				</div>
			</div>
		</main>
	);
};

export default withRouter(SubmitPage);
