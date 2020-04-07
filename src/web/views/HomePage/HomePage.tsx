import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./HomePage.scss";

const HomePage: React.FC = (): React.ReactElement => {
	const [ isTopButtonVisible, setIsTopButtonVisible ] = useState(false);

	const strings: LocalizedStrings = useSelector(getStrings);

	if (typeof window !== "undefined") {
		const trackScrolling = (): void => {
			setIsTopButtonVisible(window.scrollY > 0);
		};

		useEffect(
			() => {
				window.addEventListener("scroll", trackScrolling);

				return (): void => {
					window.removeEventListener("scroll", trackScrolling);
				};
			},
			[]);
	}

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home} | {strings.appTitle}</title>
			</Helmet>
			((TODO))
			{isTopButtonVisible && (
				<button className="HomePage__BackToTop" onClick={(): void => { window.scrollTo(window.scrollX, 0); }}>
					<i className="material-icons">arrow_upward</i>
				</button>
			)}
		</main>
	);
};

export default withRouter(HomePage);
