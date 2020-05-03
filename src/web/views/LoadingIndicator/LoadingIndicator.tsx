import React from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./LoadingIndicator.scss";

const LoadingIndicator: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	return (
		<div className="LoadingIndicator__Container">
			{strings.loading}
		</div>
	);
};

export default LoadingIndicator;
