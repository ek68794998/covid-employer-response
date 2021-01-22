import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps, useHistory } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerActionLinks from "../EmployerActionLinks/EmployerActionLinks";
import EmployerLogo from "../EmployerLogo/EmployerLogo";

import "./EmployerListItem.scss";
import EmployerRatingPill from "../EmployerRatingPill/EmployerRatingPill";

export type EmployerMetric = "lastUpdated" | "rating" | "score";

interface Props extends RouteProps {
	employerId: string;

	metric: EmployerMetric;

	onClick?: () => void;

	showDetails: boolean;
}

const getEmployeeCountComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		const employeeCountString: string | null =
			employer.employeesBefore
				? EmployerEmployeeProfile.toString(employer.employeesBefore, false, true)
				: null;

		if (!employeeCountString) {
			return null;
		}

		return (
			<span title={strings.detailDescriptions.employees}>
				{DesignHelpers.materialIcon("people")}
				{employeeCountString}
			</span>
		);
	};

const getLocationWikipediaComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		if (!employer.location) {
			return null;
		}

		const locationString: string = employer.location.city;

		const locationWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.location.wiki);

		if (!locationWikipediaUrl) {
			return <span>{locationString}</span>;
		}

		return (
			<a
				className="EmployerListItem__Location"
				href={locationWikipediaUrl}
				rel="noopener noreferrer"
				target="_blank"
				title={strings.detailDescriptions.location}
			>
				<img
					src={`/images/flags/${employer.location.country}.svg`}
					title={strings.countryNames[employer.location.country]}
				/>
				{locationString}
			</a>
		);
	};

const EmployerListItem: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { push } = useHistory();

	const { employerId, metric, onClick, showDetails } = props;

	const employer: EmployerRecordMetadata | undefined =
		useSelector((state: AppState): EmployerRecordMetadata | undefined => getEmployerMetadata(state, employerId));

	const containerClass: string =
		`EmployerListItem__Container EmployerListItem__Container--${showDetails ? "Detailed" : "Simple"}`;

	if (!employer) {
		return (
			<div className={`${containerClass} EmployerListItem__Container--NotFound`}>
				{strings.notFound}
			</div>
		);
	}

	const onClickEvent: () => void = onClick || ((): void => push(`/employers/${employer.id}`));

	const displayName: string = employer.shortName || employer.name;

	let indicatorControl: JSX.Element | null;

	switch (metric) {
		case "lastUpdated":
			indicatorControl =
				employer.lastUpdated
					? <span className="EmployerListItem__Date">{new Date(employer.lastUpdated).toLocaleDateString()}</span>
					: null;

			break;

		case "score":
		case "rating":
		default:
			indicatorControl =
				<EmployerRatingPill
					employer={employer}
					isAnnotated={false}
					isLowContrast={!showDetails}
					showGrade={metric === "score"}
				/>;

			break;
	}

	if (!showDetails) {
		return (
			<div
				className={`${containerClass} EmployerListItem__Rating--${employer.rating}`}
				onClick={onClickEvent}
			>
				<EmployerLogo employer={employer} />
				<span className="EmployerListItem__Name">
					{displayName}
				</span>
				{indicatorControl}
			</div>
		);
	}

	return (
		<div className={containerClass}>
			<div className="EmployerListItem__Title">
				<EmployerLogo employer={employer} />
				<h2>
					<a onClick={onClickEvent} title={employer.name !== displayName ? employer.name : ""}>{displayName}</a>
				</h2>
				{indicatorControl}
			</div>
			<div className="EmployerListItem__Subtitle">
				{getLocationWikipediaComponent(employer, strings)}
				{getEmployeeCountComponent(employer, strings)}
				<span className="EmployerListItem__AggregateRatings" title={strings.detailDescriptions.ratingCounts}>
					<span className="EmployerListItem__GoodRatings">
						<i className="material-icons">add</i>
						{employer.positiveCount}
					</span>
					<span className="EmployerListItem__PoorRatings">
						<i className="material-icons">remove</i>
						{employer.negativeCount}
					</span>
				</span>
			</div>
			<div className="EmployerListItem__Summary" onClick={onClickEvent}>
				<ReactMarkdown source={employer.summary} />
				<div className="EmployerListItem__OverflowScreen" />
			</div>
			<div className="EmployerListItem__Actions">
				<EmployerActionLinks employer={employer} />
				<a className="EmployerListItem__ReadMore" onClick={onClickEvent}>
					{strings.readMore}
					{DesignHelpers.materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListItem;
