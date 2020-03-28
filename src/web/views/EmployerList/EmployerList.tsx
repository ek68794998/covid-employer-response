import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerListDetails from "../EmployerListDetails/EmployerListDetails";

import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

import "./EmployerList.scss";

interface Props extends RouteComponentProps {
	employers: EmployerRecord[];

	searchFilter: EmployerListSearchFilter;
}

const EmployerList: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const { employers, searchFilter } = props;

	const [ openRow, setOpenRow ] = useState("");

	const filteredEmployers: EmployerRecord[] =
		employers ? employers.filter((e: EmployerRecord) => EmployerListSearchFilter.isMatch(searchFilter, e)) : [];

	if (!filteredEmployers.length) {
		return (
			<div className="no-results">
				{strings.noResults}
			</div>
		);
	}

	const onClick = (id: string): void => {
		setOpenRow(openRow === id ? "" : id);
	};

	const getEmployerComponent = (e: EmployerRecord, i: number): JSX.Element | null => (
		<EmployerListDetails
			key={`${i}-${e.id}`}
			employer={e}
			isOpen={openRow === e.id}
			onClick={(): void => onClick(e.id)}
		/>
	);

	return (
		<div>
			{employers.map(getEmployerComponent)}
		</div>
	);
};

export default withRouter(EmployerList) as any;
