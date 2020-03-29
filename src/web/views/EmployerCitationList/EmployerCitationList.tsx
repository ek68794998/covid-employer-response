import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationSource } from "../../../common/CitationSource";
import { CitationType } from "../../../common/CitationType";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitation from "../EmployerCitation/EmployerCitation";

import "./EmployerCitationList.scss";

interface Props extends RouteComponentProps {
	citations: Citation[];

	citationSourceBase: number;

	citationType: CitationType;
}

const EmployerCitationList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const { citations, citationSourceBase, citationType } = props;

	const getCitationComponent = (c: Citation, i: number): JSX.Element => (
		<li key={i}>{<EmployerCitation citation={c} citationSourceBase={citationSourceBase} />}</li>
	);

	return (
		<div>
			<h3
				className="citation-type"
				title={strings.citationTypeDescriptions[citationType]}
			>
				{strings.citationTypes[citationType]}
			</h3>
			<ul className="employer-citations">
				{citations.map(getCitationComponent)}
			</ul>
		</div>
	);
};

export default withRouter(EmployerCitationList) as any;
