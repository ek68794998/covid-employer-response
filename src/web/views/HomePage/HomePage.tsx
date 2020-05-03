import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { ProjectIssueSubmissionUrl, SubmissionFormUrl } from "../../../common/constants/UrlConstants";

import { getEmployerIds } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import AppHelmet from "../AppHelmet/AppHelmet";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import EmployerListItem from "../EmployerListItem/EmployerListItem";

import "./HomePage.scss";

const HomePage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const [ randomEmployerId, setRandomEmployerId ] = useState<string | undefined>(undefined);

	const employerIds: string[] | undefined = useSelector(getEmployerIds);
	const employerCount: number = employerIds ? employerIds.length : 0;

	useEffect(
		() => {
			setRandomEmployerId(
				employerIds && employerIds[Math.floor(Math.random() * employerIds.length)]);
		},
		[ employerIds?.length ]);

	return (
		<main id="home">
			<AppHelmet
				title={strings.home}
			/>
			<section className="HomePage__Row HomePage__Row--Alt HomePage__Primer">
				<div>
					<div className="HomePage__PreTitle">Welcome to</div>
					<h1>
						{strings.appTitleShort}
					</h1>
					<h2 className={`HomePage__Subtitle--${employerCount > 0 ? "Loaded" : "Loading"}`}>
						<ReactMarkdown
							allowedTypes={[ "text", "strong", "emphasis", "link" ]}
							source={format(strings.homeSubtitleText, { count: employerCount.toLocaleString() })}
							unwrapDisallowed={true}
						/>
					</h2>
				</div>
			</section>
			<section className="HomePage__Row">
				<div>
					<div className="HomePage__InfoBlock HomePage__TileBlock">
						<h3>{strings.homeSampleTitle}</h3>
						<ReactMarkdown source={strings.homeSampleDescription} />
					</div>
					<div className="HomePage__Spacer" />
					<div className="HomePage__SampleCard HomePage__TileBlock">
						{randomEmployerId && (
							<EmployerListItem
								employerId={randomEmployerId}
								metric="rating"
								showDetails={true}
							/>
						)}
					</div>
				</div>
			</section>
			<section className="HomePage__Row HomePage__Links">
				<Link className="App__BigButton" to="/employers">{strings.homeListLink}</Link>
			</section>
			<section className="HomePage__Row HomePage__Row--Alt HomePage__Row--Reverse HomePage__Submit">
				<div>
					<div className="HomePage__TileBlock">
						<img src={"/images/google-form.png"} />
					</div>
					<div className="HomePage__Spacer" />
					<div className="HomePage__InfoBlock HomePage__TileBlock">
						<h3>{strings.homeSubmitTitle}</h3>
						<ReactMarkdown
							source={(
								format(strings.homeSubmitDescription, { githubIssueUrl: ProjectIssueSubmissionUrl })
							)}
						/>
					</div>
				</div>
			</section>
			<section className="HomePage__Row HomePage__Row--Alt HomePage__Links">
				<a
					className="App__BigButton"
					href={SubmissionFormUrl}
					rel="noopener noreferrer"
					target="_blank"
				>
					{strings.homeFormLink}
				</a>
			</section>
			<BackToTopButton />
		</main>
	);
};

export default withRouter(HomePage);
