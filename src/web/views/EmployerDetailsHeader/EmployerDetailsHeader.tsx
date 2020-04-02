import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { EmployerLocation, employerLocationToString } from "../../../common/EmployerLocation";
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

const getEmployerEmployeeCountComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	let employeeCountString: string | null = null;

	if (employer.employeesBeforeMin > 0 || employer.employeesBeforeMax > 0) {
		if (employer.employeesBeforeMin === employer.employeesBeforeMax) {
			employeeCountString = employer.employeesBeforeMin.toLocaleString();
		} else if (employer.employeesBeforeMin > 0 && employer.employeesBeforeMax > 0) {
			employeeCountString = `${employer.employeesBeforeMin.toLocaleString()} ${String.fromCharCode(0x2013)} ${employer.employeesBeforeMax.toLocaleString()}`;
		} else if (employer.employeesBeforeMin > 0) {
			employeeCountString = `More than ${employer.employeesBeforeMin.toLocaleString()}`;
		} else if (employer.employeesBeforeMax > 0) {
			employeeCountString = `Less than ${employer.employeesBeforeMax.toLocaleString()}`;
		}
	}

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
	(location: EmployerLocation, strings: LocalizedStrings, useShortText: boolean): JSX.Element | null => {
		const locationWikipediaUrl: string | null = getWikipediaUrl(location.wiki);

		if (!locationWikipediaUrl) {
			return null;
		}

		return (
			<a href={locationWikipediaUrl} target="_blank" title={strings.detailDescriptions.location}>
				{materialIcon("place")}
				{employerLocationToString(location, useShortText)}
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
					className={`EmployerDetailsHeader__Rating EmployerDetailsHeader__Rating--${employer.rating}`}
					title={strings.detailDescriptions.rating}
				>
					{strings.ratingLabels[employer.rating]}
					<i className="material-icons EmployerDetailsHeader__RatingIcon">{indicatorIcon}</i>
				</span>
			</div>
			<div className="EmployerDetailsHeader__Subtitle">
				{getLocationWikipediaComponent(employer.location, strings, useShortText || false)}
				{getEmployerEmployeeCountComponent(employer, strings)}
			</div>
		</>
	);
};

export default EmployerDetailsHeader as any;
