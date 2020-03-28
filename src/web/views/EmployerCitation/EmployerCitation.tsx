import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationSource } from "../../../common/CitationSource";
import { CitationType } from "../../../common/CitationType";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerCitation.scss";

interface Props extends RouteComponentProps {
	citation: Citation;

	citationSourceBase: number;
}

const EmployerCitation: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const { citation, citationSourceBase } = props;

	const getCitationSourceComponent =
		(s: CitationSource, i: number): JSX.Element =>
			<a key={i} href={s.link} target="_blank" title={s.name}>[{i + citationSourceBase}]</a>;

	const citationType: CitationType = citation.type || "hearsay";

	const indicatorType: string =
		citation.positivity < 0 ? "negative" : citation.positivity > 0 ? "positive" : "neutral";

	return (
		<span>
			<span className={`indicator indicator-${indicatorType}`} />
			<span
				className="citation-type"
				title={strings.citationTypeDescriptions[citationType]}
			>
				{strings.citationTypes[citationType]}
			</span>
			:
			<span className="citation-summary">{citation.summary}</span>
			<sup>{citation.sources.map(getCitationSourceComponent)}</sup>
		</span>
	);
};

export default withRouter(EmployerCitation) as any;
