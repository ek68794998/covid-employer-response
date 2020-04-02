import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	onClick: () => void;
}

const materialIcon = (name: string): JSX.Element => <i className="material-icons">{name}</i>;

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const { employer, onClick } = props;

	return (
		<div className={`EmployerListDetails__Container EmployerListDetails__Rating--${employer.rating}`}>
			<EmployerDetailsHeader employer={employer} onClickEmployerName={onClick} />
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

export default EmployerListDetails as any;
