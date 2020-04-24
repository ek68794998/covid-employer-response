import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationSource } from "../../../common/CitationSource";
import { DesignHelpers } from "../../../common/DesignHelpers";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerCitation.scss";

type IndicatorIconType = "add_circle" | "add_circle_outline" | "error_outline" | "remove_circle_outline" | "remove_circle";
type Neutrality = "Neutral" | "Positive" | "Negative";

interface Props extends RouteProps {
	citation: Citation;
}

const EmployerCitation: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { citation } = props;

	const getLinkComponent =
		(s: CitationSource, i: number): JSX.Element => {
			const date: Date | null = s.date ? new Date(s.date) : null;

			let title: string = s.title ? `${s.source}: "${s.title}"` : s.source;

			if (date) {
				title = `${title} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
			}

			return (
				<span key={i} className="EmployerCitation__ReferenceContainer">
					<a href={s.link} rel="noopener noreferrer" target="_blank" title={title}>
						{s.source}
					</a>
				</span>
			);
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

	const icon: string =
		citation.type === "publication"
			? "description"
			: (citation.type === "statement" ? "how_to_reg" : "hearing");

	const iconClass: string =
		`material-icons EmployerCitation__Indicator EmployerCitation__Indicator--${indicatorClass}`;

	return (
		<div className="EmployerCitation__Container">
			<i className={iconClass}>{indicatorIcon}</i>
			<div className="EmployerCitation__Summary">
				<ReactMarkdown source={citation.summary} />
				<span className="EmployerCitation__References">
					<span title={strings.citationTypes[citation.type]}>{DesignHelpers.materialIcon(icon)}</span>
					{citation.sources && citation.sources.length > 0
						? citation.sources.map(getLinkComponent)
						: <span className="EmployerCitation__Unsourced">{strings.noSources}</span>}
				</span>
			</div>
		</div>
	);
};

export default EmployerCitation;
