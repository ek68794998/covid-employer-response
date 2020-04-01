import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitation from "../EmployerCitation/EmployerCitation";

import "./EmployerCitationList.scss";

interface Props extends RouteProps {
	citations: Citation[];

	citationSourceBase: number;

	citationType: CitationType;
}

const EmployerCitationList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const { citations, citationSourceBase, citationType } = props;

	let citationSource: number = citationSourceBase;

	const getCitationComponent = (c: Citation, i: number): JSX.Element => {
		const component: JSX.Element =
			<li key={i}>{<EmployerCitation citation={c} citationSourceBase={citationSource} />}</li>;

		citationSource += c.sources?.length || 0;

		return component;
	};

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

export default EmployerCitationList as any;
