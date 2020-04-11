import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerById } from "../../state/ducks/employers/actions";
import { getEmployer, getEmployerIds } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import BackToTopButton from "../BackToTopButton/BackToTopButton";
import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";

import "./HomePage.scss";

const HomePage: React.FC = (): React.ReactElement => {
	const dispatch: React.Dispatch<any> = useDispatch();

	const strings: LocalizedStrings = useSelector(getStrings);

	const { push } = useHistory();

	const [ randomEmployerId, setRandomEmployerId ] = useState<string | undefined>(undefined);

	const randomEmployer: EmployerRecord | undefined =
		useSelector((state: AppState) => getEmployer(state, randomEmployerId || ""));

	const employerIds: string[] | undefined = useSelector(getEmployerIds);
	const employerCount: number = employerIds ? employerIds.length : 0;

	useEffect(
		() => {
			console.log("Employer IDs changed.", employerIds);

			setRandomEmployerId(
				employerIds && employerIds[Math.floor(Math.random() * employerIds.length)]);
		},
		[ employerIds?.length ]);

	useEffect(
		() => {
			console.log("Random changed.", randomEmployerId);

			if (randomEmployerId) {
				dispatch(getEmployerById(randomEmployerId));
			}
		},
		[ randomEmployerId ]);

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home} | {strings.appTitle}</title>
			</Helmet>
			<section className="HomePage__Primer">
				<div>
					<div className="HomePage__PreTitle">Welcome to</div>
					<h1>
						{strings.appTitleShort}
					</h1>
					<h2 className={`HomePage__Subtitle--${employerCount > 0 ? "Loaded" : "Loading"}`}>
						A free, open-data collection on
						<Link to="/employers">
							<strong>{employerCount.toLocaleString()}</strong> employers
						</Link>
						(and growing) and how they've reacted to the COVID-19 crisis.
					</h2>
				</div>
			</section>
			<section className="HomePage__Sample">
				<div className="HomePage__SampleInfo">
					<h3>What can I learn?</h3>
					<p>
						Each card shows you briefly <strong>who</strong> the employer is, a <strong>rating</strong> of
						their general response, and a <strong>summary</strong> about the actions they've taken. You
						can also open up a more detailed view to find <strong>cited news articles</strong>, or click
						various <strong>links</strong> to go on Wikipedia, or see the employer's official website.
					</p>
				</div>
				<div className="HomePage__SampleSpacer" />
				<div className="HomePage__SampleCard">
					{randomEmployer && (
						<EmployerListDetails
							employer={EmployerRecord.toMetadata(randomEmployer)}
							onClick={(): void => push(`/employers/${randomEmployer.id}`)}
						/>
					)}
				</div>
			</section>
			<section className="HomePage__Links">
				<Link to="/employers">Take me to the list!</Link>
			</section>
			<BackToTopButton />
		</main>
	);
};

export default withRouter(HomePage);
