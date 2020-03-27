import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";

import "./EmployerDetails.scss";

interface EmployerDetailsProps extends RouteComponentProps {
	employer: EmployerRecord;
}

const EmployerDetails: React.FC<EmployerDetailsProps> = (props: EmployerDetailsProps): React.ReactElement => {
	const { employer } = props;

	return (
		<div>{employer.name}</div>
	);
};

export default withRouter(EmployerDetails) as any;
