import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { AppState } from "../../state/AppState";
import { getEmployers as dispatchGetEmployers } from "../../state/ducks/employers/actions";
import { getEmployers } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./Home.scss";

const Home: React.FC = (): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const employers: EmployerRecord[] = useSelector((state: AppState) => getEmployers(state));

	const dispatch: React.Dispatch<any> = useDispatch();

	useEffect(
		() => {
			dispatch(dispatchGetEmployers);
		},
		[]);

	return (
		<main id="home">
			<Helmet>
				<title>{strings.home}</title>
			</Helmet>
			<div className="content">
				{employers && employers.map((e: EmployerRecord) => e.name)}
			</div>
		</main>
	);
};

export default withRouter(Home) as any;
