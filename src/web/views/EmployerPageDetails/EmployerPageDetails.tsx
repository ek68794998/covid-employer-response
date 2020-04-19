import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordBase } from "../../../common/EmployerRecordBase";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerListItemDetailed from "../EmployerListItemDetailed/EmployerListItemDetailed";

import "./EmployerPageDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { employer } = props;

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employer?.id));

	if (!employer || !employerMetadata) {
		return null;
	}

	const logoImageRegex: RegExpExecArray | null =
		employer.image ? EmployerRecordBase.IMAGE_REGEX.exec(employer.image) : null;

	return (
		<div className="EmployerPageDetails__Container">
			<div className="EmployerPageDetails__Header">
				{logoImageRegex && (
					<img
						className="EmployerPageDetails__Icon"
						src={`/images/employers/${logoImageRegex[1]}`}
						style={{ background: logoImageRegex[2] || "#fff" }}
					/>
				)}
				<h1 className="EmployerPageDetails__Title">
					{employer.shortName || employer.name}
				</h1>
				<div className={`EmployerPageDetails__Rating EmployerPageDetails__Rating--${employerMetadata.rating}`}>
					{strings.ratingLabels[employerMetadata.rating]}
					{DesignHelpers.materialIcon(EmployerRecordMetadata.getTrendIcon(employerMetadata))}
				</div>
			</div>
			<div className="EmployerPageDetails__Summary">
				<ReactMarkdown source={employer.summary} />
			</div>
			{employer.shortName && (
				<span className="EmployerPageDetails__Subtitle">
					Officially known as <em>{employer.name}</em>.
				</span>
			)}

			<EmployerCitationList citations={employer.citations.sort(citationSort)} />

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
