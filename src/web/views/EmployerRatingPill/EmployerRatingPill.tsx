import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerRatingPill.scss";

interface Props extends RouteProps {
	employer: EmployerRecordMetadata;

	isAnnotated?: boolean;

	isLowContrast?: boolean;
}

const EmployerRatingPill: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { employer, isAnnotated, isLowContrast } = props;

	return (
		<span
			className={`EmployerRatingPill__Box EmployerRatingPill__Box--${employer.rating} ${isLowContrast ? "EmployerRatingPill__Box--LowContrast" : ""}`}
			title={strings.detailDescriptions.rating}
		>
			{strings.ratingLabels[employer.rating]}
			{isAnnotated && "*"}
			{DesignHelpers.materialIcon(EmployerRecordMetadata.getTrendIcon(employer))}
		</span>
	);
};

export default EmployerRatingPill;
