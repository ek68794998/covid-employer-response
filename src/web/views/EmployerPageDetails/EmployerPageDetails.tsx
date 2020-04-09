import React from "react";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { EmployerRecord } from "../../../common/EmployerRecord";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerPageDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const { employer } = props;

	if (!employer) {
		return null;
	}

	let globalCitationSourceBase: number = 1;

	const components: Partial<{ [key in CitationType]: JSX.Element | null }> = {};

	for (const type of [ "publication", "statement", "hearsay" ]) {
		const citations: Citation[] =
			employer.citations
				.filter((citation: Citation) => citation.type === type)
				.sort(citationSort);

		if (citations.length === 0) {
			continue;
		}

		components[type] = (
			<EmployerCitationList
				citations={citations}
				citationSourceBase={globalCitationSourceBase}
				citationType={type as CitationType}
			/>
		);

		citations.forEach((citation: Citation) => globalCitationSourceBase += citation.sources?.length || 0);
	}

	return (
		<div className="EmployerPageDetails__Container">
			<EmployerDetailsHeader employer={EmployerRecord.toMetadata(employer)} />
			<div className="EmployerPageDetails__Body">
				<div className="EmployerPageDetails__Summary">
					{employer.summary}
				</div>
				{components.publication}
				{components.statement}
				{components.hearsay}
			</div>
		</div>
	);
};

export default EmployerPageDetails;
