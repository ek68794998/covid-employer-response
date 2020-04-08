import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerActionLinks from "../EmployerActionLinks/EmployerActionLinks";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecordMetadata;

	onClick: () => void;
}

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, onClick } = props;

	return (
		<div className={`EmployerListDetails__Container EmployerListDetails__Rating--${employer.rating}`}>
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClick} useShortText={true} />
			<div className="EmployerListDetails__Summary" onClick={onClick}>
				{employer.summary}
				<div className="EmployerListDetails__OverflowScreen" />
			</div>
			<div className="EmployerListDetails__Actions">
				<EmployerActionLinks employer={employer} />
				<a className="EmployerListDetails__ReadMore" onClick={onClick}>
					{strings.readMore}
					{DesignHelpers.materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListDetails;
