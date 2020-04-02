import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerDetailsHeader.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClickEmployerName: () => void;

	useShortText?: boolean;
}

const getEmployerEditComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	if (!employer.officialWebsite) {
		return null;
	}

	const editUrl: string = `${ProjectUrl}/blob/master/public/employers/${employer.id}.yml`;

	return (
		<a href={editUrl} target="_blank" title={strings.detailDescriptions.edit}>
			{materialIcon("edit")}
		</a>
	);
};

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

const getEmployerWebsiteComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	if (!employer.officialWebsite) {
		return null;
	}

	return (
		<a href={employer.officialWebsite} target="_blank" title={strings.detailDescriptions.officialWebsite}>
			{materialIcon("home")}
		</a>
	);
};

const getEmployerWikipediaComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	const employerWikipediaUrl: string | null = getWikipediaUrl(employer.wiki);

	if (!employerWikipediaUrl) {
		return null;
	}

	return (
		<a href={employerWikipediaUrl} target="_blank" title={strings.detailDescriptions.wikipedia}>
			{materialIcon("language")}
		</a>
	);
};

const getLocationWikipediaComponent =
	(employer: EmployerRecord, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		if (!employer.location) {
			return null;
		}

		const locationString: string = EmployerLocation.toString(employer.location, useShortText);
		const locationWikipediaUrl: string | null = getWikipediaUrl(employer.location.wiki);

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

const getWikipediaUrl = (pageName?: string): string | null => {
	if (!pageName) {
		return null;
	}

	const wikipediaUrlBase: string = "https://en.wikipedia.org/wiki/__PAGE__";
	const pageNameSubpath: string = pageName.replace(" ", "_");

	return wikipediaUrlBase.replace("__PAGE__", pageNameSubpath);
};

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerDetailsHeader: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
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

	const displayName: string = (useShortText && employer.shortName) ? employer.shortName : employer.name;

	return (
		<>
			<div className={`EmployerDetailsHeader__Title ${useShortText ? "" : "EmployerDetailsHeader__Title--noShort"}`}>
				{employer.image && <img className="EmployerDetailsHeader__Icon" src={`/images/employers/${employer.image}`} />}
				<h2>
					<a href="#" onClick={onClickEmployerName} title={employer.name !== displayName ? employer.name : ""}>
						{displayName}
					</a>
				</h2>
				<span className="EmployerDetailsHeader__LinkBreak" />
				<span className="EmployerDetailsHeader__Links">
					{getEmployerWikipediaComponent(employer, strings)}
					{getEmployerWebsiteComponent(employer, strings)}
					{getEmployerEditComponent(employer, strings)}
				</span>
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
			</div>
		</>
	);
};

export default EmployerDetailsHeader as any;
