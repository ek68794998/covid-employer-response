import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps, useHistory } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerActionLinks from "../EmployerActionLinks/EmployerActionLinks";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";
import EmployerLogo from "../EmployerLogo/EmployerLogo";

import "./EmployerListItem.scss";

interface Props extends RouteProps {
	employerId: string;

	onClick?: () => void;

	showDetails: boolean;
}

const EmployerListItem: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { push } = useHistory();

	const { employerId, onClick, showDetails } = props;

	const employer: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employerId));

	if (!employer) {
		return null; // TODO
	}

	const onClickEvent: () => void = onClick || ((): void => push(`/employers/${employer.id}`));

	if (!showDetails) {
		return (
			<div
				className={`EmployerListItem__Container EmployerListItem__Container--Simple EmployerListItem__Rating--${employer.rating}`}
				onClick={onClickEvent}
			>
				<EmployerLogo employer={employer} />
				<span className="EmployerListItem__Name">{employer.shortName || employer.name}</span>
				<span className="EmployerListItem__RatingText">
					{strings.ratingLabels[employer.rating]}
					{DesignHelpers.materialIcon(
						EmployerRecordMetadata.getTrendIcon(employer), "EmployerDetailsHeader__RatingIcon")}
				</span>
			</div>
		);
	}

	return (
		<div className="EmployerListItem__Container EmployerListItem__Container--Detailed">
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClickEvent} useShortText={true} />
			<div className="EmployerListItem__Summary" onClick={onClickEvent}>
				<ReactMarkdown source={employer.summary} />
				<div className="EmployerListItem__OverflowScreen" />
			</div>
			<div className="EmployerListItem__Actions">
				<EmployerActionLinks employer={employer} />
				<a className="EmployerListItem__ReadMore" onClick={onClickEvent}>
					{strings.readMore}
					{DesignHelpers.materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListItem;
