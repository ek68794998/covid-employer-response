import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRating } from "../../../common/EmployerRating";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerRatingPill.scss";

interface Props extends RouteProps {
	employer: EmployerRecordMetadata;

	isAnnotated?: boolean;

	isLowContrast?: boolean;

	showGrade?: boolean;
}

const EmployerRatingPill: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, isAnnotated, isLowContrast, showGrade } = props;

	let text: string;
	let classSubtype: EmployerRating;

	if (showGrade) {
		classSubtype = employer.score > 0 ? "good" : employer.score < 0 ? "poor" : "fair";
		text = `${employer.score > 0 ? "+" : ""}${Math.round(employer.score)}`;
	} else {
		classSubtype = employer.rating;
		text = strings.ratingLabels[employer.rating];
	}

	return (
		<span
			className={`EmployerRatingPill__Box EmployerRatingPill__Box--${classSubtype} ${isLowContrast ? "EmployerRatingPill__Box--LowContrast" : ""}`}
			title={strings.detailDescriptions.rating}
		>
			{text}
			{isAnnotated && "*"}
			{!showGrade && DesignHelpers.materialIcon(EmployerRecordMetadata.getTrendIcon(employer))}
		</span>
	);
};

export default EmployerRatingPill;
