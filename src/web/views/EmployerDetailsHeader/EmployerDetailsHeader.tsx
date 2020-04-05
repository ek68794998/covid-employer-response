import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerActionLinks from "../EmployerActionLinks/EmployerActionLinks";

import "./EmployerDetailsHeader.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClickEmployerName?: () => void;

	useShortText?: boolean;
}

const getAliasesComponent =
	(employer: EmployerRecord, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		if (!employer.aliases || employer.aliases.length === 0 || useShortText) {
			return null;
		}

		let text: JSX.Element;

		const separator: string = ", ";
		const cutoff: number = 3;

		if (employer.aliases.length > cutoff) {
			const moreText: string = format(strings.more, { number: employer.aliases.length - cutoff });

			text = (
				<>
					{employer.aliases.slice(0, cutoff).join(separator)}&hellip;
					<span title={employer.aliases.slice(cutoff).join(separator)}> ({moreText})</span>
				</>
			);
		} else {
			text = <>{employer.aliases.join(separator)}</>;
		}

		return (
			<span title={strings.detailDescriptions.aka}>
				{materialIcon("alternate_email")}
				{text}
			</span>
		);
	};

const getEmployeeCountComponent =
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

		const locationString: string =
			EmployerLocation.toString(
				employer.location,
				useShortText ? strings.countryAbbreviations : strings.countryNames,
				useShortText);

		const locationWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.location.wiki);

		if (!locationWikipediaUrl) {
			return <span>{locationString}</span>;
		}

		return (
			<a
				className="EmployerDetailsHeader__Location"
				href={locationWikipediaUrl}
				target="_blank"
				title={strings.detailDescriptions.location}
			>
				<img src={`/images/flags/${employer.location.country}.svg`} />
				{locationString}
			</a>
		);
	};

const getTickerComponent =
	(employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
		if (!employer.ticker) {
			return null;
		}

		const tickerUrl: string = `https://finance.yahoo.com/quote/${employer.ticker}`;

		return (
			<a
				className="EmployerDetailsHeader__Ticker"
				href={tickerUrl}
				target="_blank"
				title={strings.detailDescriptions.ticker}
			>
				(${employer.ticker})
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

	const displayName: string = useShortText && employer.shortName || employer.name;

	const employerNameComponent: JSX.Element =
		onClickEmployerName
			? <a onClick={onClickEmployerName} title={employer.name !== displayName ? employer.name : ""}>{displayName}</a>
			: <>{displayName}</>;

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
					{employerNameComponent}
					{!useShortText && getTickerComponent(employer, strings)}
				</h2>
				{!useShortText && <EmployerActionLinks employer={employer} />}
				<span className="EmployerDetailsHeader__TitleGap" />
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
				{getAliasesComponent(employer, strings, useShortText || false)}
				{getEmployeeCountComponent(employer, strings, useShortText || false)}
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
