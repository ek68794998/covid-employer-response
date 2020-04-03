import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getEmployers as getEmployersRequest } from "../../state/ducks/employers/actions";
import { getEmployers } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerList from "../EmployerList/EmployerList";
import EmployerListSearch from "../EmployerListSearch/EmployerListSearch";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import "./Home.scss";

const Home: React.FC = (): React.ReactElement => {
	const [ searchText, setSearchText ] = useState("");

	const strings: LocalizedStrings = useSelector(getStrings);
	const employers: EmployerRecord[] = useSelector(getEmployers);

	const dispatch: React.Dispatch<any> = useDispatch();

	useEffect(
		() => {
			dispatch(getEmployersRequest);
		},
		[]);

	const searchFilter: EmployerListSearchFilter = {
		text: searchText,
	};

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home} | {strings.appTitle}</title>
			</Helmet>
			<div className="Home__Filters">
				<EmployerListSearch onChange={setSearchText} />
			</div>
			<div className="Home__Content">
				<EmployerList employers={employers} searchFilter={searchFilter} />
			</div>
		</main>
	);
};

export default withRouter(Home);
