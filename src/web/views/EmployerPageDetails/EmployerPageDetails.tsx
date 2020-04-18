import React from "react";
import ReactMarkdown from "react-markdown";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { EmployerRecord } from "../../../common/EmployerRecord";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";

import "./EmployerPageDetails.scss";

interface CitationListData {
	citationsFirstIndex: number;

	citationsLastIndex: number;

	employer: EmployerRecord;
}

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

const getCitationList = (data: CitationListData): JSX.Element => {
	const components: Partial<{ [key in CitationType]: JSX.Element | null }> = {};

	data.citationsLastIndex = data.citationsFirstIndex;

	for (const type of [ "publication", "statement", "hearsay" ]) {
		const citations: Citation[] =
			data.employer.citations
				.filter((citation: Citation) => citation.type === type)
				.sort(citationSort);

		if (citations.length === 0) {
			continue;
		}

		components[type] = (
			<EmployerCitationList
				citations={citations}
				citationSourceBase={data.citationsLastIndex}
				citationType={type as CitationType}
			/>
		);

		const citationCount: number =
			citations.reduce(
				(prev: number, curr: Citation) => prev + (curr.sources?.length || 0),
				data.citationsFirstIndex);

		data.citationsLastIndex += citationCount;
	}

	return (
		<>
			{components.publication}
			{components.statement}
			{components.hearsay}
		</>
	);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const { linkedEmployers, primaryEmployer } = props;

	if (!primaryEmployer) {
		return null;
	}

	return (
		<div className="EmployerPageDetails__Container">
			<EmployerDetailsHeader employer={EmployerRecord.toMetadata(primaryEmployer)} />
			<div className="EmployerPageDetails__Body">
				<div className="EmployerPageDetails__Summary">
					<ReactMarkdown source={primaryEmployer.summary} />
				</div>
			</div>
			{getCitationList({
				citationsFirstIndex: 1,
				citationsLastIndex: 1,
				employer: primaryEmployer,
			})}
			<br />
			{linkedEmployers.map((e: EmployerRecord) => (
				<>
					<EmployerDetailsHeader key={e.id} employer={EmployerRecord.toMetadata(e)} />
					{getCitationList({
						citationsFirstIndex: 1,
						citationsLastIndex: 1,
						employer: primaryEmployer,
					})}
				</>
			))}
		</div>
	);
};

export default EmployerPageDetails;
