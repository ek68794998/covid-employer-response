import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import BackToTopButton from "../BackToTopButton/BackToTopButton";
import EmployerList from "../EmployerList/EmployerList";
import EmployerListSearch from "../EmployerListSearch/EmployerListSearch";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./EmployerListPage.scss";

const EmployerListPage: React.FC = (): React.ReactElement => {
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());

	const strings: LocalizedStrings = useSelector(getStrings);

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
			<BackToTopButton />
		</main>
	);
};

export default withRouter(EmployerListPage);
