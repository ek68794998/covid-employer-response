import React from "react";
import { RouteComponentProps } from "react-router-dom";

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

	let indicatorClass: "Neutral" | "Positive" | "Negative" = "Neutral";
	let indicatorIcon: "thumb_up" | "info" | "thumb_down" = "info";

	if (citation.positivity > 0) {
		indicatorClass = "Positive";
		indicatorIcon = "thumb_up";
	} else if (citation.positivity < 0) {
		indicatorClass = "Negative";
		indicatorIcon = "thumb_down";
	}

	const iconClass: string =
		`material-icons EmployerCitation__Indicator EmployerCitation__Indicator--${indicatorClass}`;

	return (
		<div className="EmployerCitation__Container">
			<i className={iconClass}>{indicatorIcon}</i>
			<span className="EmployerCitation__Summary">
				{citation.summary}
				{citation.sources && <span className="EmployerCitation__References">{citation.sources.map(getLinkComponent)}</span>}
			</span>
		</div>
	);
};

export default EmployerCitation as any;
