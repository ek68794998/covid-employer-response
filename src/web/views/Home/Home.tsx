import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getEmployers as getEmployersRequest } from "../../state/ducks/employers/actions";
import { getEmployers } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerList from "../EmployerList/EmployerList";
import { EmployerListSearchFilter } from "../EmployerList/EmployerListSearchFilter";
import SearchInput from "../SearchInput/SearchInput";

import "./Home.scss";

const Home: React.FC = (): React.ReactElement => {
	const [ searchText, setSearchText ] = useState("");

	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const employers: EmployerRecord[] = useSelector((state: AppState) => getEmployers(state));

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
				<title>{strings.home}</title>
			</Helmet>
			<div className="filters">
				<SearchInput onChange={setSearchText} />
			</div>
			<div className="content">
				<EmployerList employers={employers} searchFilter={searchFilter} />
			</div>
		</main>
	);
};

export default withRouter(Home) as any;
