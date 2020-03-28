import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerCitation.scss";

interface Props extends RouteComponentProps {
	citation: Citation;
}

const EmployerCitation: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));

	const { citation } = props;

	const citationType: CitationType = citation.type || "hearsay";

	return (
		<span>
			<span
				className="citation-type"
				title={strings.citationTypeDescriptions[citationType]}
			>
				{strings.citationTypes[citationType]}
			</span>
			:
			{citation.summary}
		</span>
	);
};

export default withRouter(EmployerCitation) as any;
