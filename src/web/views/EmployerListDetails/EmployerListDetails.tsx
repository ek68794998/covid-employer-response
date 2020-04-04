import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { ProjectUrl } from "../../../common/constants/UrlConstants";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClick: () => void;
}

const getEmployerEditComponent = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element | null => {
	if (!employer.officialWebsite) {
		return null;
	}

	const editUrl: string = `${ProjectUrl}/blob/master/public/employers/${employer.id}.yml`;

	return (
		<a
			className="EmployerListDetails__ActionLink"
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
			className="EmployerListDetails__ActionLink"
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
			className="EmployerListDetails__ActionLink"
			href={employerWikipediaUrl}
			target="_blank"
			title={strings.detailDescriptions.wikipedia}
		>
			{materialIcon("language")}
		</a>
	);
};

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, onClick } = props;

	const rating: EmployerRating = EmployerRecord.getRating(employer);

	return (
		<div className={`EmployerListDetails__Container EmployerListDetails__Rating--${rating}`}>
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClick} useShortText={true} />
			<div className="EmployerListDetails__Summary" onClick={onClick}>
				{employer.summary}
				<div className="EmployerListDetails__OverflowScreen" />
			</div>
			<div className="EmployerListDetails__Actions">
				{getEmployerWikipediaComponent(employer, strings)}
				{getEmployerWebsiteComponent(employer, strings)}
				{getEmployerEditComponent(employer, strings)}
				<a className="EmployerListDetails__ReadMore" href="#" onClick={onClick}>
					{strings.readMore}
					{materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListDetails;
