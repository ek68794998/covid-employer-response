import React from "react";
import ReactMarkdown from "react-markdown";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { EmployerRecord } from "../../../common/EmployerRecord";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerPageDetails.scss";

interface Props extends RouteProps {
	linkedEmployers: EmployerRecord[];

	primaryEmployer: EmployerRecord;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const { linkedEmployers, primaryEmployer } = props;

	if (!primaryEmployer) {
		return null;
	}

	let globalCitationSourceBase: number = 1;

	const components: Partial<{ [key in CitationType]: JSX.Element | null }> = {};

	for (const type of [ "publication", "statement", "hearsay" ]) {
		const citations: Citation[] =
			primaryEmployer.citations
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

	console.log([ primaryEmployer, ...linkedEmployers ]);

	return (
		<div className="EmployerPageDetails__Container">
			{[ primaryEmployer, ...linkedEmployers ].map((e: EmployerRecord) => (
				<EmployerDetailsHeader key={e.id} employer={EmployerRecord.toMetadata(e)} />
			))}
			<div className="EmployerPageDetails__Body">
				<div className="EmployerPageDetails__Summary">
					<ReactMarkdown source={primaryEmployer.summary} />
				</div>
				{components.publication}
				{components.statement}
				{components.hearsay}
			</div>
		</div>
	);
};

export default EmployerPageDetails;
