import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { format, LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerActionLinks from "../EmployerActionLinks/EmployerActionLinks";

import "./EmployerDetailsHeader.scss";

interface Props extends RouteProps {
	employer: EmployerRecordMetadata;

	onClickEmployerName?: () => void;

	useShortText?: boolean;
}

const getAliasesComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
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
					<span
						className="EmployerDetailsHeader__AliasesMore"
						title={employer.aliases.slice(cutoff).join(separator)}
					>
						({moreText})
					</span>
				</>
			);
		} else {
			text = <>{employer.aliases.join(separator)}</>;
		}

		return (
			<span title={strings.detailDescriptions.aka}>
				{DesignHelpers.materialIcon("alternate_email")}
				{text}
			</span>
		);
	};

const getEmployeeCountComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		const employeeCountString: string | null =
			employer.employeesBefore
				? EmployerEmployeeProfile.toString(employer.employeesBefore, !useShortText, useShortText)
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
	(employer: EmployerRecordMetadata, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		if (!employer.location) {
			return null;
		}

		const locationString: string =
			useShortText
				? employer.location.city
				: EmployerLocation.toString(employer.location, strings.countryNames);

		const locationWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.location.wiki);

		if (!locationWikipediaUrl) {
			return <span>{locationString}</span>;
		}

		return (
			<a
				className="EmployerDetailsHeader__Location"
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

const getTickerComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		if (!employer.ticker) {
			return null;
		}

		const tickerUrl: string = `https://finance.yahoo.com/quote/${employer.ticker}`;

		return (
			<a
				className="EmployerDetailsHeader__Ticker"
				href={tickerUrl}
				rel="noopener noreferrer"
				target="_blank"
				title={strings.detailDescriptions.ticker}
			>
				(${employer.ticker})
			</a>
		);
	};

const EmployerDetailsHeader: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, onClickEmployerName, useShortText } = props;

	let indicatorIcon: "trending_up" | "trending_flat" | "trending_down";

	switch (employer.rating) {
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
					className={`EmployerDetailsHeader__Rating EmployerDetailsHeader__Rating--${employer.rating}`}
					title={strings.detailDescriptions.rating}
				>
					{strings.ratingLabels[employer.rating]}
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
						{employer.positiveCount}
					</span>
					<span className="EmployerDetailsHeader__PoorRatings">
						<i className="material-icons">remove</i>
						{employer.negativeCount}
					</span>
				</span>
			</div>
		</>
	);
};

export default EmployerDetailsHeader;
