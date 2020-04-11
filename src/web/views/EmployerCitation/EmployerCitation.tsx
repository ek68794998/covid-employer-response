import React from "react";
import ReactMarkdown from "react-markdown";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationSource } from "../../../common/CitationSource";

import "./EmployerCitation.scss";

type IndicatorIconType = "add_circle" | "add_circle_outline" | "error_outline" | "remove_circle_outline" | "remove_circle";
type Neutrality = "Neutral" | "Positive" | "Negative";

interface Props extends RouteProps {
	citation: Citation;

	citationSourceBase: number;
}

const EmployerCitation: React.FC<Props> = (props: Props): React.ReactElement => {
	const { citation, citationSourceBase } = props;

	const getLinkComponent =
		(s: CitationSource, i: number): JSX.Element => {
			const date: Date | null = s.date ? new Date(s.date) : null;

			let title: string = s.title ? `${s.source}: ${s.title}` : s.source;

			if (date) {
				title = `${title} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
			}

			return <a key={i} href={s.link} rel="noopener noreferrer" target="_blank" title={title}>[{i + citationSourceBase}]</a>;
		};

	let indicatorClass: Neutrality = "Neutral";
	let indicatorIcon: IndicatorIconType = "error_outline";

	if (citation.positivity > 0) {
		indicatorClass = "Positive";
		indicatorIcon = citation.positivity > 1 ? "add_circle" : "add_circle_outline";
	} else if (citation.positivity < 0) {
		indicatorClass = "Negative";
		indicatorIcon = citation.positivity < -1 ? "remove_circle" : "remove_circle_outline";
	}

	const iconClass: string =
		`material-icons EmployerCitation__Indicator EmployerCitation__Indicator--${indicatorClass}`;

	return (
		<div className="EmployerCitation__Container">
			<i className={iconClass}>{indicatorIcon}</i>
			<span className="EmployerCitation__Summary">
				<ReactMarkdown source={citation.summary} />
				{citation.sources && <span className="EmployerCitation__References">{citation.sources.map(getLinkComponent)}</span>}
			</span>
		</div>
	);
};

export default EmployerCitation;
