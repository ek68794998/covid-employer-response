import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";

import "./EmployerListDetails.scss";

interface Props extends RouteComponentProps {
	employer: EmployerRecord;

	isOpen: boolean;

	onClick: () => void;
}

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const { employer, isOpen, onClick } = props;

	return (
		<div>
			{employer.name}
			<button onClick={onClick}>Click</button>
			{isOpen && <div>Open</div>}
		</div>
	);
};

export default withRouter(EmployerListDetails) as any;
