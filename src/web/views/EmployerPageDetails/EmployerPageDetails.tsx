import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata } from "../../state/ducks/employers/selectors";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerDetailsHeader from "../EmployerDetailsHeader/EmployerDetailsHeader";
import EmployerListItemDetailed from "../EmployerListItemDetailed/EmployerListItemDetailed";

import "./EmployerPageDetails.scss";

interface CitationListData {
	citationsFirstIndex: number;

	citationsLastIndex: number;

	employer: EmployerRecord;
}

interface Props extends RouteProps {
	employer: EmployerRecord;
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
	const { employer } = props;

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employer?.id));

	if (!employer || !employerMetadata) {
		return null;
	}

	return (
		<div className="EmployerPageDetails__Container">
			<EmployerDetailsHeader employer={employerMetadata} />
			<div className="EmployerPageDetails__Body">
				<div className="EmployerPageDetails__Summary">
					<ReactMarkdown source={employer.summary} />
				</div>
			</div>
			{getCitationList({
				citationsFirstIndex: 1,
				citationsLastIndex: 1,
				employer,
			})}
			{employer.parentId && (
				<>
					<h2>Parent</h2>
					<EmployerListItemDetailed employerId={employer.parentId} />
				</>
			)}
			{employer.childIds.length > 0 && (
				<>
					<h2>Subsidiaries</h2>
					{employer.childIds.map((id: string) => (
						<EmployerListItemDetailed key={id} employerId={id} />
					))}
				</>
			)}
		</div>
	);
};

export default EmployerPageDetails;
