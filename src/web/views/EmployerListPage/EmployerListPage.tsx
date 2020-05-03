import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import AppHelmet from "../AppHelmet/AppHelmet";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import EmployerList from "../EmployerList/EmployerList";
import EmployerListSearch from "../EmployerListSearch/EmployerListSearch";

import "./EmployerListPage.scss";

const EmployerListPage: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	return (
		<main id="employer-list">
			<AppHelmet
				title={strings.employerList}
			/>
			<div className="EmployerListPage__Filters">
				<EmployerListSearch />
			</div>
			<div className="EmployerListPage__Container">
				<div className="EmployerListPage__Content">
					<EmployerList />
				</div>
			</div>
			<BackToTopButton />
		</main>
	);
};

export default withRouter(EmployerListPage);
