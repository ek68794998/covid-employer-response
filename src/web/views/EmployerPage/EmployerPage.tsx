import React from "react";
import { RouteProps } from "react-router-dom";

import "./EmployerPage.scss";

interface Props extends RouteProps {
	employerId: string;
}

const EmployerPage: React.FC<Props> = (props: Props): React.ReactElement => {
	const { employerId } = props;

	return (
		<div className="EmployerPage__Container">
		</div>
	);
};

export default EmployerPage;
