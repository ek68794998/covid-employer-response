import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationSource } from "../../../common/CitationSource";

import "./EmployerCitation.scss";

interface Props extends RouteComponentProps {
	citation: Citation;

	citationSourceBase: number;
}

const EmployerCitation: React.FC<Props> = (props: Props): React.ReactElement => {
	const { citation, citationSourceBase } = props;

	const getLinkComponent =
		(s: CitationSource, i: number): JSX.Element => {
			const date: Date | null = s.date ? new Date(s.date) : null;

			let title: string = s.name;

			if (date) {
				title = `${title} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
			}

			return <a key={i} href={s.link} target="_blank" title={title}>[{i + citationSourceBase}]</a>;
		};

	let indicatorClass: "neutral" | "positive" | "negative" = "neutral";
	let indicatorIcon: "thumb_up" | "info" | "thumb_down" = "info";

	if (citation.positivity > 0) {
		indicatorClass = "positive";
		indicatorIcon = "thumb_up";
	} else if (citation.positivity < 0) {
		indicatorClass = "negative";
		indicatorIcon = "thumb_down";
	}

	return (
		<div className="citation">
			<i className={`material-icons indicator indicator-${indicatorClass}`}>{indicatorIcon}</i>
			<span className="citation-summary">
				{citation.summary}
				{citation.sources && <span className="citation-references">{citation.sources.map(getLinkComponent)}</span>}
			</span>
		</div>
	);
};

export default withRouter(EmployerCitation) as any;
