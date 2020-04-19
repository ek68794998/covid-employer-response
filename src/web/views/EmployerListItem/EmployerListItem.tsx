import React from "react";
import { useSelector } from "react-redux";
import { RouteProps, useHistory } from "react-router-dom";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerLogo from "../EmployerLogo/EmployerLogo";

import "./EmployerListItem.scss";

interface Props extends RouteProps {
	employerId: string;

	onClick?: () => void;
}

const EmployerListItem: React.FC<Props> = (props: Props): React.ReactElement | null => {
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
		<div
			className={`EmployerListItem__Container EmployerListItem__Rating--${employer.rating}`}
			onClick={onClickEvent}
		>
			<EmployerLogo employer={employer} />
			{employer.name}
		</div>
	);
};

export default EmployerListItem;
