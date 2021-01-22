import React from "react";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";

import EmployerCitation from "../EmployerCitation/EmployerCitation";

import "./EmployerCitationList.scss";

interface Props extends RouteProps {
	citations: Citation[];
}

const EmployerCitationList: React.FC<Props> = (props: Props): React.ReactElement => {
	const { citations } = props;

	return (
		<ul className="EmployerCitationList__Citations">
			{citations.map((c: Citation, i: number): JSX.Element => (
				<li key={i}>
					<EmployerCitation citation={c} />
				</li>
			))}
		</ul>
	);
};

export default EmployerCitationList;
