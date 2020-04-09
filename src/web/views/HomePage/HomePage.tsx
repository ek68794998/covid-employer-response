import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import BackToTopButton from "../BackToTopButton/BackToTopButton";

import "./HomePage.scss";

const HomePage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home} | {strings.appTitle}</title>
			</Helmet>
			((TODO))
			<BackToTopButton />
		</main>
	);
};

export default withRouter(HomePage);
