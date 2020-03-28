import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { GetCitationTypeValue } from "../../../common/CitationType";
import { EmployerRecord } from "../../../common/EmployerRecord";

import EmployerCitation from "../EmployerCitation/EmployerCitation";

import "./EmployerListDetails.scss";

interface Props extends RouteComponentProps {
	employer: EmployerRecord;

	isOpen: boolean;

	onClick: () => void;
}

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const { employer, isOpen, onClick } = props;

	let citations: JSX.Element[] = [];

	if (isOpen) {
		citations =
			employer.citations
				.sort((a: Citation, b: Citation) => {
					if (a.positivity !== b.positivity) {
						return b.positivity - a.positivity;
					}

					const aType: number = GetCitationTypeValue(a.type);
					const bType: number = GetCitationTypeValue(b.type);

					if (aType !== bType) {
						return bType - aType;
					}

					return b.sources.length - a.sources.length;
				})
				.map((value: Citation, i: number) => (
					<li key={i}>
						<EmployerCitation citation={value} />
					</li>
				));
	}

	return (
		<div className="employer-container">
			<button className="employer-header" onClick={onClick}>
				<div className="employer-title">{employer.name}</div>
				<span>&#x25BC;</span>
			</button>
			<div className="employer-body">
				{citations.length > 0 && <ul className="employer-citations">{citations}</ul>}
			</div>
		</div>
	);
};

export default withRouter(EmployerListDetails) as any;
