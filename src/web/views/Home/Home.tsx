import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerList from "../EmployerList/EmployerList";
import EmployerListSearch from "../EmployerListSearch/EmployerListSearch";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./Home.scss";

const Home: React.FC = (): React.ReactElement => {
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());
	const [ isTopButtonVisible, setIsTopButtonVisible ] = useState(false);

	const strings: LocalizedStrings = useSelector(getStrings);

	const dispatch: React.Dispatch<any> = useDispatch();

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

	const backToTopComponent: JSX.Element =
		<button className="Home__BackToTop" onClick={(): void => { window.scrollTo(window.scrollX, 0); }}>
			<i className="material-icons">arrow_upward</i>
		</button>;

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home} | {strings.appTitle}</title>
			</Helmet>
			<div className="Home__Filters">
				<EmployerListSearch onChange={setSearchFilters} />
			</div>
			<div className="Home__Content">
				<EmployerList searchFilter={searchFilters} />
			</div>
			{isTopButtonVisible && backToTopComponent}
		</main>
	);
};

export default withRouter(Home);
