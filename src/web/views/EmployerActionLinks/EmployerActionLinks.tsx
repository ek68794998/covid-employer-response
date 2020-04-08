import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerActionLinks.scss";

interface Props extends RouteProps {
	employer: EmployerRecordMetadata;
}

const getEmployerEditComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		const editUrl: string = `${ProjectUrl}/blob/master/public/employers/${employer.id}.yml`;

		return (
			<a
				className="EmployerActionLinks__Link"
				href={editUrl}
				rel="noopener noreferrer"
				target="_blank"
				title={strings.detailDescriptions.edit}
			>
				{DesignHelpers.materialIcon("edit")}
			</a>
		);
	};

const getEmployerWebsiteComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		if (!employer.officialWebsite) {
			return null;
		}

		return (
			<a
				className="EmployerActionLinks__Link"
				href={employer.officialWebsite}
				rel="noopener noreferrer"
				target="_blank"
				title={strings.detailDescriptions.officialWebsite}
			>
				{DesignHelpers.materialIcon("home")}
			</a>
		);
	};

const getEmployerWikipediaComponent =
	(employer: EmployerRecordMetadata, strings: LocalizedStrings): JSX.Element | null => {
		const employerWikipediaUrl: string | null = WikipediaHelpers.getWikipediaUrl(employer.wiki);

		if (!employerWikipediaUrl) {
			return null;
		}

		return (
			<a
				className="EmployerActionLinks__Link"
				href={employerWikipediaUrl}
				rel="noopener noreferrer"
				target="_blank"
				title={strings.detailDescriptions.wikipedia}
			>
				{DesignHelpers.materialIcon("language")}
			</a>
		);
	};

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
