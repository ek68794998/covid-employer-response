import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerDetailsHeader.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClickEmployerName: () => void;

	useShortText?: boolean;
}

const getEmployerEmployeeCountComponent =
	(employer: EmployerRecord, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		const employeeCountString: string | null =
			employer.employeesBefore
				? EmployerEmployeeProfile.toString(employer.employeesBefore, !useShortText, useShortText)
				: null;

		if (!employeeCountString) {
			return null;
		}

		return (
			<span title={strings.detailDescriptions.employees}>
				{materialIcon("people")}
				{employeeCountString}
			</span>
		);
	};

const getLocationWikipediaComponent =
	(employer: EmployerRecord, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		if (!employer.location) {
			return null;
		}

		const locationString: string = EmployerLocation.toString(employer.location, useShortText);
		const locationWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.location.wiki);

		if (!locationWikipediaUrl) {
			return <span>{locationString}</span>;
		}

		return (
			<a href={locationWikipediaUrl} target="_blank" title={strings.detailDescriptions.location}>
				{materialIcon("place")}
				{locationString}
			</a>
		);
	};

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerDetailsHeader: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, onClickEmployerName, useShortText } = props;

	let indicatorIcon: "trending_up" | "trending_flat" | "trending_down";

	const rating: EmployerRating = EmployerRecord.getRating(employer);

	switch (rating) {
		case "good":
			indicatorIcon = "trending_up";
			break;

		case "poor":
			indicatorIcon = "trending_down";
			break;

		case "fair":
		default:
			indicatorIcon = "trending_flat";
	}

	let displayName: string = employer.name;

	if (useShortText) {
		if (employer.shortName) {
			displayName = employer.shortName;
		}
	} else if (employer.aliases && employer.aliases.length > 0) {
		displayName = `${displayName} (${employer.aliases.join(", ")})`;
	}

	let positives: number = 0;
	let negatives: number = 0;

	for (const citation of employer.citations) {
		if (citation.positivity > 0) {
			positives++;
		} else if (citation.positivity < 0) {
			negatives++;
		}
	}

	return (
		<>
			<div className={`EmployerDetailsHeader__Title ${useShortText ? "" : "EmployerDetailsHeader__Title--noShort"}`}>
				{employer.image && <img className="EmployerDetailsHeader__Icon" src={`/images/employers/${employer.image}`} />}
				<h2>
					<a href="#" onClick={onClickEmployerName} title={employer.name !== displayName ? employer.name : ""}>
						{displayName}
					</a>
				</h2>
				<span
					className={`EmployerDetailsHeader__Rating EmployerDetailsHeader__Rating--${rating}`}
					title={strings.detailDescriptions.rating}
				>
					{strings.ratingLabels[rating]}
					<i className="material-icons EmployerDetailsHeader__RatingIcon">{indicatorIcon}</i>
				</span>
			</div>
			<div className="EmployerDetailsHeader__Subtitle">
				{getLocationWikipediaComponent(employer, strings, useShortText || false)}
				{getEmployerEmployeeCountComponent(employer, strings, useShortText || false)}
				<span className="EmployerDetailsHeader__AggregateRatings" title={strings.detailDescriptions.ratingCounts}>
					<span className="EmployerDetailsHeader__GoodRatings">
						<i className="material-icons">add</i>
						{positives}
					</span>
					<span className="EmployerDetailsHeader__PoorRatings">
						<i className="material-icons">remove</i>
						{negatives}
					</span>
				</span>
			</div>
		</>
	);
};

export default EmployerDetailsHeader;
