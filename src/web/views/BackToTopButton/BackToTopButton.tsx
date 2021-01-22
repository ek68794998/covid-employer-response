import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./BackToTopButton.scss";

const getIsVisible = (): boolean => typeof window === "undefined" ? false : window.scrollY > 0;

const BackToTopButton: React.FC = (): React.ReactElement | null => {
	const [ isVisible, setIsVisible ] = useState(getIsVisible());
	const strings: LocalizedStrings = useSelector(getStrings);

	if (typeof window !== "undefined") {
		const trackScrolling = (): void => {
			setIsVisible(getIsVisible());
		};

		useEffect(
			(): void => {
				trackScrolling();

				window.addEventListener("scroll", trackScrolling);

				return (): void => {
					window.removeEventListener("scroll", trackScrolling);
				};
			},
			[]);
	}

	if (!isVisible) {
		return null;
	}

	return (
		<button
			className="BackToTopButton__Link"
			onClick={(): void => { window.scrollTo(window.scrollX, 0); }}
			title={strings.backToTop}
		>
			<i className="material-icons">arrow_upward</i>
		</button>
	);
};

export default withRouter(BackToTopButton);
