import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerList from "../EmployerList/EmployerList";
import EmployerListSearch from "../EmployerListSearch/EmployerListSearch";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./EmployerListPage.scss";

const EmployerListPage: React.FC = (): React.ReactElement => {
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());
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
		<main id="employer-list">
			<Helmet>
				<title>{strings.employerList} | {strings.appTitle}</title>
			</Helmet>
			<div className="EmployerListPage__Filters">
				<EmployerListSearch onChange={setSearchFilters} />
			</div>
			<div className="EmployerListPage__Content">
				<EmployerList searchFilter={searchFilters} />
			</div>
			{isTopButtonVisible && (
				<button className="EmployerListPage__BackToTop" onClick={(): void => { window.scrollTo(window.scrollX, 0); }}>
					<i className="material-icons">arrow_upward</i>
				</button>
			)}
		</main>
	);
};

export default withRouter(EmployerListPage);
