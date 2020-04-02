import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { employerLocationToString } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClick: () => void;
}

const getWikipediaUrl = (pageName?: string): string | null => {
	if (!pageName) {
		return null;
	}

	const wikipediaUrlBase: string = "https://en.wikipedia.org/wiki/__PAGE__";
	const pageNameSubpath: string = pageName.replace(" ", "_");

	return wikipediaUrlBase.replace("__PAGE__", pageNameSubpath);
};

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

	const employerWikipediaUrl: string | null = getWikipediaUrl(employer.wiki);
	const locationWikipediaUrl: string = getWikipediaUrl(employer.location.wiki) || "";

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
					{employerWikipediaUrl && <a href={employerWikipediaUrl}><i className="material-icons">language</i></a>}
					{employer.officialWebsite && <a href={employer.officialWebsite}><i className="material-icons">home</i></a>}
				</span>
				<span className="EmployerListDetails__Rating">
					{strings.ratingLabels[employer.rating]}
					<i className="material-icons EmployerListDetails__RatingIcon">{indicatorIcon}</i>
				</span>
			</div>
			<div className="EmployerListDetails__Subtitle">
				<a href={locationWikipediaUrl}>{employerLocationToString(employer.location)}</a>
				{employeeCountString && <span>{employeeCountString} <i className="material-icons">people</i></span>}
			</div>
			<div className="EmployerListDetails__Summary">
				{employer.summary}
				<div className="EmployerListDetails__OverflowScreen" />
			</div>
			<div className="EmployerListDetails__Actions">
				<a href="#" onClick={onClick}>
					Read more
					<i className="material-icons">fullscreen</i>
				</a>
			</div>
		</div>
	);
};

export default EmployerListDetails as any;
