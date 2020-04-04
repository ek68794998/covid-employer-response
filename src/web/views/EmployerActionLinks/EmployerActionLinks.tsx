import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerActionLinks.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;
}

const getEmployerEditComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	if (!employer.officialWebsite) {
		return null;
	}

	const editUrl: string = `${ProjectUrl}/blob/master/public/employers/${employer.id}.yml`;

	return (
		<a
			className="EmployerActionLinks__Link"
			href={editUrl}
			target="_blank"
			title={strings.detailDescriptions.edit}
		>
			{materialIcon("edit")}
		</a>
	);
};

const getEmployerWebsiteComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	if (!employer.officialWebsite) {
		return null;
	}

	return (
		<a
			className="EmployerActionLinks__Link"
			href={employer.officialWebsite}
			target="_blank"
			title={strings.detailDescriptions.officialWebsite}
		>
			{materialIcon("home")}
		</a>
	);
};

const getEmployerWikipediaComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	const employerWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.wiki);

	if (!employerWikipediaUrl) {
		return null;
	}

	return (
		<a
			className="EmployerActionLinks__Link"
			href={employerWikipediaUrl}
			target="_blank"
			title={strings.detailDescriptions.wikipedia}
		>
			{materialIcon("language")}
		</a>
	);
};

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerActionLinks: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer } = props;

	return (
		<>
			{getEmployerWikipediaComponent(employer, strings)}
			{getEmployerWebsiteComponent(employer, strings)}
			{getEmployerEditComponent(employer, strings)}
		</>
	);
};

export default EmployerActionLinks;
