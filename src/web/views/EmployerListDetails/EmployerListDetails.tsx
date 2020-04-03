import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClick: () => void;
}

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, onClick } = props;

	const rating: EmployerRating = EmployerRecord.getRating(employer);

	return (
		<div className={`EmployerListDetails__Container EmployerListDetails__Rating--${rating}`}>
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClick} useShortText={true} />
			<div className="EmployerListDetails__Summary">
				{employer.summary}
				<div className="EmployerListDetails__OverflowScreen" />
			</div>
			<div className="EmployerListDetails__Actions">
				<a href="#" onClick={onClick}>
					{strings.readMore}
					{materialIcon("fullscreen")}
				</a>
			</div>
		</div>
	);
};

export default EmployerListDetails;
