import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerLocation, employerLocationToString } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClick: () => void;
}

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

const getLocationWikipediaComponent = (location: EmployerLocation, strings: LocalizedStrings): JSX.Element | null => {
	const locationWikipediaUrl: string | null = getWikipediaUrl(location.wiki);

	if (!locationWikipediaUrl) {
		return null;
	}

	return (
		<a href={locationWikipediaUrl} target="_blank" title={strings.detailDescriptions.location}>
			{employerLocationToString(location)}
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

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const { employer, onClick } = props;

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

	return (
		<div className={`EmployerListDetails__Container EmployerListDetails__Rating--${employer.rating}`}>
			<div className="EmployerListDetails__Title">
				{employer.image && <img className="EmployerListDetails__Icon" src={`/images/employers/${employer.image}`} />}
				<h2>
					<a href="#" onClick={onClick}>{employer.name}</a>
				</h2>
				<span className="EmployerListDetails__Links">
					{getEmployerWikipediaComponent(employer, strings)}
					{getEmployerWebsiteComponent(employer, strings)}
				</span>
				<span className="EmployerListDetails__Rating" title={strings.detailDescriptions.rating}>
					{strings.ratingLabels[employer.rating]}
					<i className="material-icons EmployerListDetails__RatingIcon">{indicatorIcon}</i>
				</span>
			</div>
			<div className="EmployerListDetails__Subtitle">
				{getLocationWikipediaComponent(employer.location, strings)}
				{employeeCountString && <span title={strings.detailDescriptions.employees}>{employeeCountString}{materialIcon("people")}</span>}
			</div>
			<div className="EmployerListDetails__Summary">
				{employer.summary}
				<div className="EmployerListDetails__OverflowScreen" />
			</div>
			<div className="EmployerListDetails__Actions">
				<a href="#" onClick={onClick}>
					Read more
					{materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListDetails as any;
