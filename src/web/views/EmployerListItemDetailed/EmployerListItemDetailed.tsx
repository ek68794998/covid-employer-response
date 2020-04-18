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

import "./EmployerListItemDetailed.scss";

interface Props extends RouteProps {
	employerId: string;

	onClick?: () => void;
}

const EmployerListItemDetailed: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { push } = useHistory();

	const { employerId, onClick } = props;

	const employer: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employerId));

	if (!employer) {
		return null; // TODO
	}

	const onClickEvent: () => void = onClick || ((): void => push(`/employers/${employer.id}`));

	return (
		<div className="EmployerListItemDetailed__Container">
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClickEvent} useShortText={true} />
			<div className="EmployerListItemDetailed__Summary" onClick={onClickEvent}>
				<ReactMarkdown source={employer.summary} />
				<div className="EmployerListItemDetailed__OverflowScreen" />
			</div>
			<div className="EmployerListItemDetailed__Actions">
				<EmployerActionLinks employer={employer} />
				<a className="EmployerListItemDetailed__ReadMore" onClick={onClickEvent}>
					{strings.readMore}
					{DesignHelpers.materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListItemDetailed;
