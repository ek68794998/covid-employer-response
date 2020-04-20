import React from "react";
import { RouteProps } from "react-router-dom";

import { EmployerRecordBase } from "../../../common/EmployerRecordBase";

import "./EmployerLogo.scss";

interface Props extends RouteProps {
	employer: EmployerRecordBase;
}

const EmployerLogo: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const { employer } = props;

	const logoImageRegex: RegExpExecArray | null =
		employer.image ? EmployerRecordBase.IMAGE_REGEX.exec(employer.image) : null;

	if (!logoImageRegex) {
		return null;
	}

	return (
		<img
			className="EmployerLogo__Image"
			src={`/images/employers/${logoImageRegex[1]}`}
			style={{ background: logoImageRegex[2] || "#fff" }}
		/>
	);
};

export default EmployerLogo;
